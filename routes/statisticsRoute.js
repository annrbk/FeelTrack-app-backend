import express from "express";
const router = express.Router();
import { authenticateToken } from "../authMiddleware.js";
import { getEmotionsWithDates } from "../controllers/statisticsController.js";

router.get("/get-emotions-with-dates", authenticateToken, getEmotionsWithDates);

export default router;
