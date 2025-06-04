import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { IoMdClose } from "react-icons/io";

const WishlistSidebar = ({ isOpen, onClose }) => {
  const { token } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (isOpen && token) {
      const fetchWishlist = async () => {
        try {
          const res = await axios.get("/api/wishlist", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setWishlistItems(res.data);
        } catch (err) {
          console.error("Failed to fetch wishlist:", err);
        }
      };

      fetchWishlist();
    }
  }, [isOpen, token]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">My Wishlist</h2>
        <button onClick={onClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[90%]">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item) => (
            <div key={item._id} className="border-b py-3">
              <div className="flex items-center gap-3">
                <img
                  src={item.productId.image?.[0]}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover border rounded"
                />
                <div>
                  <p className="font-medium">{item.productId.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.productId.variants[0].price}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistSidebar;
