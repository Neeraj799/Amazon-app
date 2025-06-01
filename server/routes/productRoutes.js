import express from "express";
import { createProduct } from "../controllers/product.controller.js";
import multer from "multer";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/createProduct/:id",

  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createProduct
);
// router.get("/getAllProduct", getAllProduct);

export default router;
