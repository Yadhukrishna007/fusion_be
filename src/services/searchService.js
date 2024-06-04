import UserModel from "../models/userModel.js";
import ConversationModel from "../models/conversationModel.js";
const searchService = async (keyword, sender_id) => {
  try {
    const users = await UserModel.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    }).find({
      _id: { $ne: sender_id },
    });

    const conversations = await ConversationModel.find({
      isGroup: true,
      name: { $regex: keyword, $options: "i" },
      users: sender_id,
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    const data = [...users, ...conversations];

    return data;
  } catch (error) {
    throw error;
  }
};

export default searchService;
