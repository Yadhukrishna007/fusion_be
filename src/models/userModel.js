import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [, "Please enter your name"],
    },

    email: {
      type: String,
      required: [true, "Enter your email address"],
      validate: [validator.isEmail, "Please enter a valid Email Address"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Please enter password with minimum 8 characters"],
      maxLength: [128, "Password should not exceed 128 characters"],
    },
    status: {
      type: String,
      default: "Hey guys Whatsup?",
      maxLength: [20, "status should not exceed 20 characters"],
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/duxrswftp/image/upload/v1717170948/chatbot/5907_cqgwyh_hjepl1.jpg",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
export default UserModel;
