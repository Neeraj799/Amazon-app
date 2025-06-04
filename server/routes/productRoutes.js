import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductsBySubcategories,
  getSingleProduct,
  searchProduct,
  updateProduct,
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
router.get("/search", searchProduct);
router.get("/getAllProduct", getAllProducts);
router.get("/getProductsBySubcategories", getProductsBySubcategories);
router.get("/:id", getSingleProduct);
router.patch(
  "/updateProduct/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateProduct
);

export default router;
