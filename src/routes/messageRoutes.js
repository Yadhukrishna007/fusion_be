import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(authMiddleware, sendMessage);
router.route("/:conversationId").get(authMiddleware, getMessages);
export default router;
