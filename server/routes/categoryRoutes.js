import express from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategory", getAllCategory);

export default router;
