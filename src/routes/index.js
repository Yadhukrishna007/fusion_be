import express from "express";
import authRoutes from "./authRoutes.js";
import conversationRoutes from "./conversationRoutes.js";
import messageRoutes from "./messageRoutes.js";
import searchRoute from "./searchRoute.js";
import usersRoute from "./usersRoute.js";
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/conversation", conversationRoutes);
router.use("/message", messageRoutes);
router.use("/search", searchRoute);
router.use("/users", usersRoute);

export default router;
