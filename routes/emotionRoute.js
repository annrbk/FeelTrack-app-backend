import express from "express";
const router = express.Router();
import { authenticateToken } from "../authMiddleware.js";
import { addEmotion } from "../controllers/emotionController.js";

router.post("/add", authenticateToken, addEmotion);

export default router;
