import ConversationModel from "../models/conversationModel.js";
import MessageModel from "../models/messageModel.js";

export const createMessage = async (data) => {
  try {
    const message = await MessageModel.create(data);
    return message;
  } catch (error) {
    throw error;
  }
};

export const populateMessage = async (messageId) => {
  try {
    const populatedMessage = await MessageModel.findById(messageId)
      .populate({
        path: "sender",
        select: "name picture",
        model: "UserModel",
      })
      .populate({
        path: "conversation",
        select: "name picture isGroup users",
        model: "ConversationModel",
        populate: {
          path: "users",
          select: "name email picture status",
          model: "UserModel",
        },
      });

    return populatedMessage;
  } catch (error) {
    throw error;
  }
};
export const updateLatestMessage = async (Id, conversationId) => {
  try {
    const updatedConversationModel = await ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        latestMessage: Id,
      }
    );

    return updatedConversationModel;
  } catch (error) {
    throw error;
  }
};

export const getConversationMessages = async (conversationId) => {
  try {
    const messages = await MessageModel.find({
      conversation: conversationId,
    })
      .populate({
        path: "sender",
        select: "name picture email status",
      })
      .populate({
        path: "conversation",
      });

    return messages;
  } catch (error) {
    throw error;
  }
};
