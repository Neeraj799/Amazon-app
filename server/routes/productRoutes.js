import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductsBySubcategory,
} from "../controllers/product.controller.js";
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
router.get("/getAllProduct", getAllProducts);
router.get("/:id", getProductsBySubcategory);

export default router;
