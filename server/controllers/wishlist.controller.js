import Wishlist from "../models/wishlist.js";

const toggleWishlist = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const userId = req.user.userId;

    const existing = await Wishlist.findOne({ userId, productId });

    if (existing) {
      await Wishlist.deleteOne({ _id: existing._id });
      return res.json({ success: true, message: "Removed from wishlist" });
    } else {
      await Wishlist.create({ userId, productId });
      return res.json({ success: true, message: "Added to wishlist" });
    }
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const checkWishlist = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user.userId;

    const exists = await Wishlist.findOne({ userId, productId });

    if (exists) {
      return res.json({
        success: true,
        inWishlist: true,
        message: "Product is in wishlist",
      });
    } else {
      return res.json({
        success: true,
        inWishlist: false,
        message: "Product is not in wishlist",
      });
    }
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getAllWishlists = async (req, res) => {
  try {
    const userId = req.user.userId;

    const wishlists = await Wishlist.find({ userId }).populate("productId");

    return res.status(200).json(wishlists);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const wishlistCount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const wishlistCount = await Wishlist.countDocuments({ userId: userId });

    return res.status(200).json({ success: true, wishlistCount });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { toggleWishlist, checkWishlist, getAllWishlists, wishlistCount };
