import Category from "../models/category.js";

const createCategory = async (req, res) => {
  try {
    console.log("data");

    const { name } = req.body;

    const categoryData = {
      name,
    };
    const category = new Category(categoryData);
    await category.save();

    return res
      .status(200)
      .json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { createCategory, getAllCategory };
