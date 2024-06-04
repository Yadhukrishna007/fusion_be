import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);

    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
