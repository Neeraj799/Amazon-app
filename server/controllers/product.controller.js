import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, variants } = req.body;
    const parsedVariants = JSON.parse(variants);

    const { id: subcatgoryId } = req.params;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];

    const images = [image1, image2, image3].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      variants: parsedVariants,
      image: imagesUrl,
      subCategory: subcatgoryId,
    };

    const product = new Product(productData);
    console.log("data", product);

    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("subCategory");
    return res.json(products);
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getProductsBySubcategory = async (req, res) => {
  try {
    const { id: subcategoryId } = req.params;
    const products = await Product.find({
      subCategory: subcategoryId,
    }).populate("subCategory");
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { createProduct, getAllProducts, getProductsBySubcategory };
