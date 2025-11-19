import express from "express";
import { categories, productList, singleProduct } from "../controllers/catalog.controller.js";

const router = express.Router();

router.get("/categories", categories);
router.get("/products/:categoryId", productList);
router.get("/product/:sku", singleProduct);

export default router;
