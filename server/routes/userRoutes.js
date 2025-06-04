import express from "express";
import { checkAuth, login, signup } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check", protectRoute, checkAuth);
export default router;
