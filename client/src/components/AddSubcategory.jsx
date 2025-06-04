import React, { useEffect, useState } from "react";
import axios from "axios";

const AddSubcategoryModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/category/getAllCategory");

        const data = res.data;
        console.log("data", data);

        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      alert("Please select a category.");
      return;
    }

    try {
      const res = await axios.post(
        `/api/subCategory/create/${selectedCategoryId}`,
        { name }
      );

      if (res.data.success) {
        setName("");
        setSelectedCategoryId("");
        onClose();
      }
    } catch (error) {
      console.error("Failed to create subcategory", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Subcategory Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter subcategory name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Select Category
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategoryModal;
