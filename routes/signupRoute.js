import express from "express";
const router = express.Router();
import { signup } from "../controllers/signupController.js";

router.post("/signup", signup);

export default router;
