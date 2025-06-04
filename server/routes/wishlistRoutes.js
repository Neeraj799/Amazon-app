import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  checkWishlist,
  getAllWishlists,
  toggleWishlist,
  wishlistCount,
} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllWishlists);
router.get("/check/:id", protectRoute, checkWishlist);
router.get("/wishlistCount", protectRoute, wishlistCount);
router.post("/toggle/:id", protectRoute, toggleWishlist);

export default router;
