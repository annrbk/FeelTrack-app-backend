import express from "express";
const router = express.Router();
import { authenticateToken } from "../authMiddleware.js";
import {
  addEmotion,
  deleteEmotion,
  getCurrentEmotions,
} from "../controllers/emotionController.js";

router.post("/add", authenticateToken, addEmotion);
router.get("/get", authenticateToken, getCurrentEmotions);
router.delete("/delete/:id", authenticateToken, deleteEmotion);

export default router;
