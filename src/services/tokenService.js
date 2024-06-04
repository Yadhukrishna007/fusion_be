import jwt from "jsonwebtoken";
export const generateToken = async (payload, secret) => {
  try {
    const token = await jwt.sign(payload, secret);
    return token;
  } catch (error) {
    throw error;
  }
};
