import express from "express";
import { test } from "../controllers/testController.js";

const router = express.Router();
router.route("/").get(test);

export default router;
