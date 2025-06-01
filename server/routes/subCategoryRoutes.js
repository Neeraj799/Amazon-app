import express from "express";
import {
  createSubCategory,
  getAllSubcategory,
} from "../controllers/subCategory.controller.js";

const router = express.Router();

router.post("/create/:id", createSubCategory);
router.get("/getSubcategory", getAllSubcategory);

export default router;
