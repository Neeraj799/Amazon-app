import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import AddCategoryModal from "../components/AddCategoryModal";
import AddSubcategoryModal from "../components/AddSubcategory";
import AddProductModal from "../components/AddProductModal";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState({});
  const [groupedCategories, setGroupedCategories] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalCount, setTotalCount] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const navigate = useNavigate();

  const fetchSearchedProducts = async (query) => {
    try {
      const res = await axios.get(`/api/product/search?query=${query}`);
      setProducts(res.data.products);
      setTotalCount(res.data.totalCount);
    } catch (error) {
      console.log("Search fetch error", error);
    }
  };

  const getSelectedSubcategoryIds = () => {
    const selectedNames = Object.keys(checked).filter((name) => checked[name]);

    const selectedIds = [];

    for (const [category, subs] of Object.entries(groupedCategories)) {
      for (const sub of subs) {
        if (selectedNames.includes(sub.name)) {
          selectedIds.push(sub._id);
        }
      }
    }

    return selectedIds;
  };

  const fetchFilteredProducts = async (subIds) => {
    try {
      const res = await axios.get(
        `/api/product/getProductsBySubcategories?ids=${subIds.join(
          ","
        )}&page=${page}&limit=${limit}`
      );
      setProducts(res.data.products);
      setTotalCount(res.data.totalCount);
    } catch (error) {
      console.log("Error fetching filtered products", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchedProducts(searchQuery);
    } else {
      setProducts([]);
    }
    const subIds = getSelectedSubcategoryIds();
    if (subIds.length > 0) {
      fetchFilteredProducts(subIds);
    } else {
      setProducts([]);
      setTotalCount(0);
    }
  }, [checked, page, limit, searchQuery]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <div className="flex px-4 py-6">
        <Sidebar
          checked={checked}
          setChecked={setChecked}
          groupedCategories={groupedCategories}
          setGroupedCategories={setGroupedCategories}
        />
        <div className="flex-1 px-4 py-2">
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 cursor-pointer"
            >
              Add Category
            </button>
            <button
              onClick={() => setIsSubModalOpen(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 cursor-pointer"
            >
              Add Subcategory
            </button>
            <button
              onClick={() => setIsProductModalOpen(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 cursor-pointer"
            >
              Add Product
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {products.map((product) => (
              <div
                onClick={() => navigate(`/productDetail/${product._id}`)}
                key={product._id}
                className="relative border rounded-lg p-4 bg-white hover:shadow-md transition"
              >
                {/* Wishlist Icon */}
                <div className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-500">
                  <FaRegHeart />
                </div>

                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-40 object-contain"
                />

                <h3 className="text-sm text-[#003b5c] font-semibold mt-2 cursor-pointer">
                  {product.name}
                </h3>

                <p className="text-gray-700 text-sm mt-1">
                  ${product.variants[0].price}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mt-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {products.length > 0 && (
            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
              {/* Showing count */}
              <span>
                Showing {products.length} of {totalCount} items
              </span>

              {/* Page buttons */}
              <div className="flex items-center space-x-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer ${
                        pageNumber === page
                          ? "bg-[#fdbf2d] text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              {/* Limit select */}
              <div className="flex items-center space-x-1">
                <span>Show</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value));
                    setPage(1); // reset to first page on limit change
                  }}
                  className="border rounded px-1 py-0.5 text-sm"
                >
                  <option value={4}>4 rows</option>
                  <option value={10}>10 rows</option>
                  <option value={20}>20 rows</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <AddSubcategoryModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
      />

      <AddProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </>
  );
};

export default HomePage;
