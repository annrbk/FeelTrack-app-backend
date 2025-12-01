import express from "express";
const router = express.Router();
import { authenticateToken } from "../authMiddleware.js";
import {
  addEmotion,
  getCurrentEmotions,
} from "../controllers/emotionController.js";

router.post("/add", authenticateToken, addEmotion);
router.get("/get", authenticateToken, getCurrentEmotions);

export default router;
