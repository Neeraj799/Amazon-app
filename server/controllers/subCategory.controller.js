import Subcategory from "../models/subCategory.js";

const createSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id: categoryId } = req.params;

    const subCategory = await Subcategory.create({
      name,
      category: categoryId,
    });
    return res.json({
      success: true,
      message: "Subcategory created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getAllSubcategory = async (req, res) => {
  try {
    const subCategory = await Subcategory.find({}).populate("category");

    return res.status(200).json(subCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { createSubCategory, getAllSubcategory };
