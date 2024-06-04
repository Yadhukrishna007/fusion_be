import {
  existingConversation,
  creatConversation,
  receiverDetails,
  getUserConversation,
  updateGroupInfo,
  updateGroupPicture,
} from "../services/conversationServices.js";
import {
  DEFAULT_GROUP_DESCRIPTION,
  DEFAULT_GROUP_PICTURE,
} from "../utils/constants.js";
export const createOrOpenConversation = async (req, res, next) => {
  try {
    const senderId = req.user.id;

    const { receiverId, isGroup } = req.body;

    if (isGroup == false) {
      if (!receiverId) throw new Error("Please input receiver id");
      const isExisting = await existingConversation(
        senderId,
        receiverId,
        false
      );

      if (isExisting) {
        res.status(200).json({
          Message: " Existing conversation",
          conversation: isExisting,
        });
      } else {
        const receiver = await receiverDetails(receiverId);
        const receiverData = {
          name: receiver.name,
          isGroup: false,
          users: [senderId, receiverId],
          picture: receiver.picture,
        };
        const newOne = await creatConversation(receiverData);

        res.status(200).json({
          Message: "New conversation created",
          conversation: newOne,
        });
      }
    } else {
      //check if group chat exists
      const existed_group_conversation = await existingConversation(
        "",
        "",
        isGroup
      );

      res.status(200).json({
        Message: "New Group created",
        conversation: existed_group_conversation,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const openConversation = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const conversation = await getUserConversation(senderId);
    res.status(200).json({
      Message: "Opening conversation",
      conversation: conversation,
    });
  } catch (error) {
    next(error);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    const { name, users, description, uploadedPicture } = req.body;

    //add current user to users
    users.push(req.user.id);
    if (!name || !users) {
      throw new Error("Please fill all fields.");
    }
    if (users.length < 2) {
      throw new Error("Atleast 2 users are required to start a group chat.");
    }
    let convoData = {
      name,
      description: description || DEFAULT_GROUP_DESCRIPTION,
      users,
      isGroup: true,
      admin: req.user.id,
      picture: uploadedPicture ? uploadedPicture : DEFAULT_GROUP_PICTURE,
    };

    const newConvo = await creatConversation(convoData);

    res.status(200).json(newConvo);
  } catch (error) {
    next(error);
  }
};

//update group
export const updateGroup = async (req, res, next) => {
  try {
    const groupInfo = req.body;
    if (groupInfo.description) {
      const gpInfo = await updateGroupInfo(groupInfo);

      res.status(200).json({
        message: " Group information updated",
        gpInfo,
      });
    } else {
      const gpInfo = await updateGroupPicture(groupInfo);

      res.status(200).json({
        message: " Group picture updated",
        gpInfo,
      });
    }
  } catch (error) {
    next(error);
  }
};
