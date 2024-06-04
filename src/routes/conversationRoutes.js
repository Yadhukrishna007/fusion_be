import express from "express";
import {
  openConversation,
  createOrOpenConversation,
  createGroup,
  updateGroup,
} from "../controllers/conversationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createOrOpenConversation);
router.route("/").get(authMiddleware, openConversation);
router.route("/group").post(authMiddleware, createGroup);
router.route("/updateGroup").post(authMiddleware, updateGroup);
export default router;
