import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";

const AddProductModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [variant1, setVariant1] = useState({ ram: "", price: "", quantity: 1 });
  const [variant2, setVariant2] = useState({ ram: "", price: "", quantity: 1 });
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([null, null, null]);
  const [imageFiles, setImageFiles] = useState([null, null, null]);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("/api/subcategory/getSubcategory");
      setSubcategoryOptions(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching subcategories");
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

  const handleAddVariants = () => {
    const newVariants = [];
    if (variant1.ram && variant1.price && variant1.quantity)
      newVariants.push(variant1);
    if (variant2.ram && variant2.price && variant2.quantity)
      newVariants.push(variant2);
    setVariants([...variants, ...newVariants]);
    setVariant1({ ram: "", price: "", quantity: 1 });
    setVariant2({ ram: "", price: "", quantity: 1 });
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !selectedSubcategory ||
      variants.length === 0
    ) {
      toast.error("Please fill in all required fields.");
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
      await axios.post(
        `/api/product/createProduct/${selectedSubcategory}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product added successfully!");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.response?.data?.message || "Error submitting product.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setSelectedSubcategory("");
    setDescription("");
    setVariant1({ ram: "", price: "", quantity: 1 });
    setVariant2({ ram: "", price: "", quantity: 1 });
    setVariants([]);
    setImages([null, null, null]);
    setImageFiles([null, null, null]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg relative">
        {/* ✅ [Added] Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Add Product</h2>

        {/* Title */}
        <div className="flex mb-4 justify-between px-10">
          <label className="block mb-1 font-medium">Title :</label>
          <input
            type="text"
            className="w-[580px] border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Variants */}
        <div className="flex mb-4 justify-between px-10">
          <div className="flex w-1/2 items-center">
            <label className="block mb-1 font-medium">Variants:</label>
          </div>
          <div className="flex flex-col gap-4">
            {[variant1, variant2].map((v, idx) => (
              <div className="flex items-center gap-2" key={idx}>
                <label className="block mb-1 font-medium">Ram:</label>
                <input
                  type="text"
                  className="w-1/4 border px-3 py-2 rounded"
                  value={v.ram}
                  onChange={(e) =>
                    idx === 0
                      ? setVariant1({ ...variant1, ram: e.target.value })
                      : setVariant2({ ...variant2, ram: e.target.value })
                  }
                />
                <label className="block mb-1 font-medium">Price:</label>
                <input
                  type="text"
                  className="w-1/4 border px-3 py-2 rounded"
                  value={v.price}
                  onChange={(e) =>
                    idx === 0
                      ? setVariant1({ ...variant1, price: e.target.value })
                      : setVariant2({ ...variant2, price: e.target.value })
                  }
                />
                <label className="block mb-1 font-medium">Quantity:</label>
                <input
                  type="number"
                  className="w-1/4 border px-3 py-2 rounded"
                  value={v.quantity}
                  onChange={(e) =>
                    idx === 0
                      ? setVariant1({ ...variant1, quantity: e.target.value })
                      : setVariant2({ ...variant2, quantity: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mb-4 px-10">
          <button
            onClick={handleAddVariants}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-900"
          >
            Add Variants
          </button>
        </div>

        {variants.length > 0 && (
          <div className="px-10 mb-4">
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {variants.map((v, idx) => (
                <li key={idx}>
                  RAM: {v.ram}, Price: ₹{v.price}, Quantity: {v.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Subcategory */}
        <div className="flex mb-4 justify-between px-10 items-center">
          <label className="block mb-1 font-medium">Sub Category :</label>
          <select
            className="w-[580px] border px-3 py-2 rounded"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">Select a subcategory</option>
            {subcategoryOptions.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex mb-4 justify-between px-10">
          <label className="block mb-1 font-medium">Description :</label>
          <input
            type="text"
            className="w-[580px] border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Images */}
        <div className="flex mb-4 justify-between px-10">
          <div className="w-full block mb-1 font-medium pt-2">
            Upload Image:
          </div>
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
                    src={image}
                    alt="Preview"
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
        <div className="flex justify-end px-10 gap-10">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
          >
            Submit
          </button>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-md"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
