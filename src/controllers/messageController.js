import {
  createMessage,
  updateLatestMessage,
  populateMessage,
  getConversationMessages,
} from "../services/messageService.js";
export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { conversationId, message, files } = req.body;

    if (!conversationId) throw new error("Please enter converstaion id");

    const data = {
      sender: senderId,
      message,
      conversation: conversationId,
      files: files || [],
    };
    const create = await createMessage(data);

    const update = await updateLatestMessage(
      create._id,
      create.conversation._id
    );

    const populatedMessage = await populateMessage(create._id);
    res.status(200).json({
      message: "Message send",
      populateMessage: populatedMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const conversationId = req.params.conversationId;

    if (!conversationId) throw new Error("Please enter conversation Id");
    const populatedMessages = await getConversationMessages(conversationId);
    res.status(200).json({
      Message: "messages",
      populatedMessages: populatedMessages,
    });
  } catch (error) {
    next(error);
  }
};
