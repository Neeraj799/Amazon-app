import React, { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";
import WishlistSidebar from "./WishlistSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { AuthUser, token, logout } = useContext(AuthContext);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [wishlistItem, setWishlistItem] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [AuthUser]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("/api/wishlist/wishlistCount", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      console.log("data", data);

      setWishlistItem(data.wishlistCount);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  return (
    <>
      <div className="bg-[#003F62] py-4 px-10 flex justify-between items-center">
        <div className="px-20 w-full">
          <div className="flex w-full  max-w-md rounded-2xl overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-[#EDA415] text-white rounded-2xl px-6 py-2 text-sm font-semibold cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
        <div className="px-10">
          <div className="flex items-center gap-6 text-white text-sm ml-10">
            <div
              onClick={() => setIsWishlistOpen(true)}
              className=" relative flex items-center  gap-6 cursor-pointer"
            >
              <CiHeart className="size-15" />
              <span className="absolute bg-[#EDA415] w-1/6  ml-1 left-8 text-sm  text-white text-center rounded-full">
                {wishlistItem}
              </span>
              <span className="w-full ml-2 ">Wishlist</span>
            </div>

            <div className="relative flex items-center  gap-4 cursor-pointer">
              <CiShoppingCart className="size-15" />
              <span className="absolute bg-[#EDA415] w-1/6  ml-2 left-6 text-sm  text-white text-center rounded-full">
                2
              </span>
              <span className="w-full ml-2">Cart</span>
            </div>
            <div
              onClick={() => logout()}
              className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 cursor-pointer"
            >
              Logout
            </div>
          </div>
        </div>
      </div>

      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
};

export default Navbar;
