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

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    return res.json(product);
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getProductsBySubcategories = async (req, res) => {
  try {
    const { ids } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    if (!ids) {
      return res
        .status(400)
        .json({ success: false, message: "Subcategory IDs are required" });
    }

    const subcategoryIds = ids.split(",");

    // Filter to find products with subCategory in subcategoryIds
    const filter = { subCategory: { $in: subcategoryIds } };

    const [products, totalCount] = await Promise.all([
      Product.find(filter)
        .populate({
          path: "subCategory",
          populate: { path: "category" },
        })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return res.json({ products, totalCount });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const searchProduct = async (req, res) => {
  const { query } = req.query;

  const products = await Product.find({
    name: { $regex: query, $options: "i" },
  });

  return res.json({ products, totalCount: products.length });
};

const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const { name, description, variants, subCategory } = req.body;
    const parsedVariants = variants ? JSON.parse(variants) : [];

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];

    const newImages = [image1, image2, image3].filter(Boolean);

    const uploadedImageUrls = await Promise.all(
      newImages.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Fetch existing product
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (variants) product.variants = parsedVariants;
    if (subCategory) product.subCategory = subCategory;
    if (uploadedImageUrls.length > 0) product.image = uploadedImageUrls;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductsBySubcategories,
  getSingleProduct,
  searchProduct,
  updateProduct,
};
