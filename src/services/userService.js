import UserModel from "../models/userModel.js";
import { DEFAULT_USER_PICTURE } from "../utils/constants.js";

export const getUserService = async (senderId) => {
  try {
    const data = await UserModel.find({ _id: { $ne: senderId } }).sort({
      name: 1,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserPicture = async (senderId, userData) => {
  try {
    if (userData.default) {
      const defaultPicture = { picture: DEFAULT_USER_PICTURE };
      const data = await UserModel.findOneAndUpdate(
        { _id: senderId },
        defaultPicture,
        {
          new: true,
          fields: "-password",
        }
      );

      return data;
    } else {
      const defaultPicture = { picture: userData.picture };
      const data = await UserModel.findOneAndUpdate(
        { _id: senderId },
        defaultPicture,
        {
          new: true,
          fields: "-password",
        }
      );

      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (senderId, userData) => {
  try {
    const data = await UserModel.findOneAndUpdate({ _id: senderId }, userData, {
      new: true,
      fields: "-password",
    });

    return data;
  } catch (error) {
    throw error;
  }
};
