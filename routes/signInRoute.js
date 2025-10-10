import express from "express";
const router = express.Router();
import { signin } from "../controllers/signinController.js";

router.post("/signin", signin);

export default router;
