// components/AddCategoryModal.js
import React, { useState } from "react";
import axios from "axios";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async () => {
    try {
      const response = await axios.post("/api/category/createCategory", {
        name: categoryName,
      });
      const data = response.data;
      onClose();
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-center text-lg font-semibold mb-4">Add Category</h2>
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border rounded-md px-4 py-2 mb-4"
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={handleAddCategory}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
          >
            ADD
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-md"
          >
            DISCARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
