import express from "express";
const router = express.Router();
import { updateUserData } from "../controllers/accountController.js";
import { authenticateToken } from "../authMiddleware.js";

router.put("/update", authenticateToken, updateUserData);

export default router;
