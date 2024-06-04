import express from "express";
import { getusers, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(authMiddleware, getusers);
router.route("/").post(authMiddleware, updateUser);

export default router;
