import express from "express";
import { generateAuthCode, generateToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/authorization-code", generateAuthCode);
router.post("/token", generateToken);

export default router;
