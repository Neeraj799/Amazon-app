import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.js";

const createProduct = async (req, res) => {
  try {
    const { name, ram, price, quantity } = req.body;

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
      ram,
      price,
      quantity,
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

export { createProduct };
