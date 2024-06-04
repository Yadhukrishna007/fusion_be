let onlineUsers = [];
const socketHandler = (socket, io) => {
  socket.on("join", (userId) => {
    socket.join(userId);

    const existingUserIndex = onlineUsers.findIndex(
      (user) => user.userId === userId
    );

    if (existingUserIndex === -1) {
      // If userId not found, add new entry
      onlineUsers.push({ userId: userId, socketId: socket.id });
    } else {
      // If userId found, update existing entry with new socketId
      onlineUsers[existingUserIndex].socketId = socket.id;
    }

    //send online users to frontend
    io.emit("get-online-users", onlineUsers);

    //send socket id
    socket.emit("setup_socket", socket.id);
  });

  //disconnect socket
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((item) => item.socketId !== socket.id);

    io.emit("get-online-users", onlineUsers);
  });

  //Join conversation room
  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
  });

  //Send messages
  socket.on("send_message", (msg) => {
    if (!msg.conversation.users) return;
    msg.conversation.users.forEach((item) => {
      if (item._id === msg.sender._id) return;
      socket.in(item._id).emit("receive_message", msg);
    });
  });

  // create Group
  socket.on("create_group", (data) => {
    data.users.forEach((item) => {
      if (item._id === data.admin) return;
      socket.in(item._id).emit("create_group", data);
    });
  });

  // update_user_info
  socket.on("update_user_info", (data) => {
    let userList = onlineUsers.filter((user) => user.userId !== data._id);

    for (let user of userList) {
      io.to(user.userId).emit("update_user_info", data);
    }
  });

  //update user pic
  socket.on("update_user_pic", (data) => {
    let userList = onlineUsers.filter((user) => user.userId !== data._id);

    for (let user of userList) {
      io.to(user.userId).emit("update_user_pic", data);
    }
  });

  //update gp pic
  socket.on("update_group_pic", (data) => {
    data.users.forEach((item) => {
      if (item._id === data.admin) return;
      socket.in(item._id).emit("update_group_pic", data);
    });
  });

  //update gp info
  socket.on("update_group_info", (data) => {
    data.users.forEach((item) => {
      if (item._id === data.admin) return;
      socket.in(item._id).emit("update_group_info", data);
    });
  });

  //Typing
  socket.on("start_typing", (conversationId) => {
    socket.in(conversationId).emit("start_typing", conversationId);
  });

  socket.on("stop_typing", (conversationId) => {
    socket.in(conversationId).emit("stop_typing");
  });

  socket.on("callUser", (data) => {
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    if (!userSocketId) {
      io.to(data.from).emit("user_not_online");
    } else {
      io.to(userSocketId.socketId).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    }
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", {
      signal: data.signal,
      receiverId: data.receiverId,
    });
  });

  //---end call
  socket.on("end call", (data) => {
    if (data.flag === false) {
      io.to(data.socketId).emit("end call");
    } else {
      let userSocketId = onlineUsers.find((user) => user.userId == data.id);
      if (userSocketId) {
        io.to(userSocketId.socketId).emit("end call");
      }
    }
  });
};
export default socketHandler;
