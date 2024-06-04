import validator from "validator";
import UserModel from "../models/userModel.js";
import { DEFAULT_USER_PICTURE, STATUS_MESSAGE } from "../utils/constants.js";
import { encryptPassword } from "../utils/functions.js";
import bcrypt from "bcrypt";
export const registerService = async (userData) => {
  const { name, email, password } = userData;

  try {
    if (!name || !email || !password) {
      throw new Error("Please fill all the fields");
    }

    if (!validator.isLength(name, { min: 2, max: 20 })) {
      throw new Error("Length of name should be between 2 and 20 characters");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    const valid = await UserModel.findOne({ email });
    if (valid) {
      throw new Error("This email already exists!");
    }

    if (!validator.isLength(password, { min: 8, max: 16 })) {
      throw new Error("Please enter password between 8 and 16  characters");
    }

    const encryptedPassword = await encryptPassword(password);

    const user = await new UserModel({
      name,
      email,
      password: encryptedPassword,
      status: STATUS_MESSAGE,
      picture: DEFAULT_USER_PICTURE,
    }).save();

    return user;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (userData) => {
  try {
    const { email, password } = userData;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid Credentials");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
