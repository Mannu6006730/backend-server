import express from "express";
import { createOrder, orderStatus } from "../controllers/order.controller.js";

const router = express.Router();

// Create order → POST http://localhost:5000/order/create
router.post("/create", createOrder);

// Order status → GET http://localhost:5000/order/status/:ref
router.get("/status/:ref", orderStatus);

export default router;
