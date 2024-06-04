import ConversationModel from "../models/conversationModel.js";
import UserModel from "../models/userModel.js";
import { DEFAULT_GROUP_PICTURE } from "../utils/constants.js";

export const existingConversation = async (senderId, receiverId, isGroup) => {
  try {
    if (isGroup == false) {
      let conversation = await ConversationModel.findOne({
        isGroup: false,
        $and: [
          { users: { $elemMatch: { $eq: senderId } } },

          { users: { $elemMatch: { $eq: receiverId } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");

      if (conversation) {
        conversation = await UserModel.populate(conversation, {
          path: "latestMessage.sender",
          select: "name email pictute status",
        });

        return conversation;
      }
    } else {
      //its a agroup chat

      let conversation = await ConversationModel.findById(isGroup)

        .populate("users admin", "-password")
        .populate("latestMessage");

      if (conversation) {
        conversation = await UserModel.populate(conversation, {
          path: "latestMessage.sender",
          select: "name email pictute status",
        });

        return conversation;
      }
      //
    }
  } catch (error) {
    throw error;
  }
};

export const receiverDetails = async (receiverId) => {
  try {
    const { name, picture } = await UserModel.findOne({ _id: receiverId });

    return { name, picture };
  } catch (error) {
    throw error;
  }
};

export const creatConversation = async (receiverData) => {
  try {
    const conversation = await ConversationModel.create(receiverData);
    const populatedConversation = await UserModel.populate(conversation, {
      path: "users",
      select: "-password",
    });

    return populatedConversation;
  } catch (error) {
    throw error;
  }
};

export const getUserConversation = async (senderId) => {
  try {
    let conversation = await ConversationModel.find({
      users: { $elemMatch: { $eq: senderId } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    conversation = await UserModel.populate(conversation, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    if (conversation) return conversation;
  } catch (error) {
    throw error;
  }
};

//update group
export const updateGroupInfo = async (groupInfo) => {
  try {
    const id = groupInfo.id;
    const updateInfo = {
      name: groupInfo.name,
      description: groupInfo.description,
    };

    let conversation = await ConversationModel.findOneAndUpdate(
      { _id: id },
      updateInfo,
      {
        new: true,
      }
    )
      .populate("users admin", "-password")
      .populate("latestMessage");

    if (conversation) {
      conversation = await UserModel.populate(conversation, {
        path: "latestMessage.sender",
        select: "name email pictute status",
      });

      return conversation;
    }
  } catch (error) {
    throw error;
  }
};

export const updateGroupPicture = async (groupInfo) => {
  try {
    const id = groupInfo.id;
    if (groupInfo.default) {
      const defaultPicture = { picture: DEFAULT_GROUP_PICTURE };

      let conversation = await ConversationModel.findOneAndUpdate(
        { _id: id },
        defaultPicture,
        {
          new: true,
        }
      )
        .populate("users admin", "-password")
        .populate("latestMessage");

      if (conversation) {
        conversation = await UserModel.populate(conversation, {
          path: "latestMessage.sender",
          select: "name email pictute status",
        });

        return conversation;
      }
    } else {
      const defaultPicture = { picture: groupInfo.picture };

      let conversation = await ConversationModel.findOneAndUpdate(
        { _id: id },
        defaultPicture,
        {
          new: true,
        }
      )
        .populate("users admin", "-password")
        .populate("latestMessage");

      if (conversation) {
        conversation = await UserModel.populate(conversation, {
          path: "latestMessage.sender",
          select: "name email pictute status",
        });

        return conversation;
      }
    }
  } catch (error) {
    throw error;
  }
};
