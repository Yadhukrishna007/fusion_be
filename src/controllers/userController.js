import {
  getUserService,
  updateUserPicture,
  updateUserInfo,
} from "../services/userService.js";

export const getusers = async (req, res, next) => {
  const senderId = req.user.id;

  try {
    const users = await getUserService(senderId);
    res.status(200).json({
      message: "users found",
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const senderId = req.user.id;
  const userData = req.body;

  try {
    if (userData?.status) {
      const userInfo = await updateUserInfo(senderId, userData);
      res.status(200).json({
        message: " User info updated",
        userInfo,
      });
    } else {
      const userInfo = await updateUserPicture(senderId, userData);
      res.status(200).json({
        message: " User picture updated",
        userInfo,
      });
    }
  } catch (error) {
    next(error);
  }
};
