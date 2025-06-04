import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { FiImage } from "react-icons/fi";

const EditProductModal = ({ productId, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([null, null, null]);
  const [imageFiles, setImageFiles] = useState([null, null, null]);

  useEffect(() => {
    fetchSubcategories();
    fetchProductDetails();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("/api/subcategory/getSubcategory");
      setSubcategoryOptions(res.data);
    } catch (err) {
      toast.error("Error fetching subcategories.");
    }
  };

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`/api/product/${productId}`);
      const product = res.data;

      setTitle(product.name);
      setSelectedSubcategory(product.subcategory);
      setDescription(product.description);
      setVariants(product.variants);
      setImages(
        product.image.concat(Array(3 - product.image.length).fill(null))
      );
    } catch (err) {
      toast.error("Error loading product details.");
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...images];
    const updatedFiles = [...imageFiles];

    updatedImages[index] = URL.createObjectURL(file);
    updatedFiles[index] = file;

    setImages(updatedImages);
    setImageFiles(updatedFiles);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !selectedSubcategory ||
      variants.length === 0
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("subcategory", selectedSubcategory);
    formData.append("variants", JSON.stringify(variants));

    imageFiles.forEach((file, index) => {
      if (file) {
        formData.append(`image${index + 1}`, file);
      }
    });

    try {
      const res = await axios.patch(
        `/api/product/updateProduct/${productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Product updated!");
      onSuccess(res.data);
      onClose();
    } catch (err) {
      toast.error("Error updating product.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 w-full max-w-4xl rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Edit Product</h2>

        {/* Title */}
        <div className="flex mb-4 justify-between px-10">
          <label className="font-medium">Title :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[580px] border px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div className="flex mb-4 justify-between px-10">
          <label className="font-medium">Description :</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[580px] border px-3 py-2 rounded"
          />
        </div>

        {/* Subcategory */}
        <div className="flex mb-4 justify-between px-10 items-center">
          <label className="font-medium">Subcategory :</label>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="w-[580px] border px-3 py-2 rounded"
          >
            <option value="">Select Subcategory</option>
            {subcategoryOptions.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Variants */}
        <div className="px-10 mb-4">
          <label className="font-medium block mb-2">Variants :</label>
          {variants.map((v, idx) => (
            <div key={idx} className="flex gap-4 items-center mb-2">
              <input
                type="text"
                placeholder="RAM"
                className="w-1/3 border px-2 py-1 rounded"
                value={v.ram}
                onChange={(e) =>
                  handleVariantChange(idx, "ram", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Price"
                className="w-1/3 border px-2 py-1 rounded"
                value={v.price}
                onChange={(e) =>
                  handleVariantChange(idx, "price", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Qty"
                className="w-1/3 border px-2 py-1 rounded"
                value={v.quantity}
                onChange={(e) =>
                  handleVariantChange(idx, "quantity", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="flex  mb-4 justify-between px-10">
          <label className="w-1/2 block mb-1 font-medium pt-2">Images :</label>
          <div className="flex w-full gap-2 flex-wrap pr-20">
            {images.map((image, index) => (
              <label
                key={index}
                className="w-[100px] h-[100px] border-2 border-dashed border-gray-300 flex items-center justify-center rounded cursor-pointer overflow-hidden"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />
                {image ? (
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiImage className="text-gray-400 text-3xl" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 px-10">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
