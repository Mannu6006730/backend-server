import express from "express";
import { createOrder, orderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/status/:ref", orderStatus);

export default router;
