import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import EditProductModal from "../components/EditProductModal";

const ProductDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productId, setProductId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }

    if (token) {
      fetchWishlistStatus();
    }
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${id}`);
      setProduct(res.data);
      setSelectedImage(res.data.image[0]);
      setSelectedRam(res.data.variants[0].ram);
      setProductId(res.data._id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchWishlistStatus = async () => {
    try {
      const res = await axios.get(`/api/wishlist/check/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      console.log("data", data);

      setInWishlist(data.inWishlist);
    } catch (error) {
      console.log("Error checking wishlist:", error);
    }
  };

  const handleWishlistToggle = async () => {
    try {
      const res = await axios.post(`/api/wishlist/toggle/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      console.log("data1", data);

      fetchWishlistStatus();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <>
      <div className="text-sm text-gray-600 mb-2 px-2 py-2">
        <span
          onClick={() => navigate("/")}
          className="text-black font-medium cursor-pointer"
        >
          Home
        </span>
        <span className="mx-1">{">"}</span>
        <span className="text-black font-medium">Product details</span>
        <span className="mx-1">{">"}</span>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={selectedImage}
            alt="Main product"
            className="w-full h-[400px] object-contain border rounded-lg"
          />
          <div className="flex gap-4 mt-4">
            {product.image?.map((img, id) => (
              <img
                key={id}
                src={img}
                alt={product.name}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 object-contain border rounded cursor-pointer ${
                  selectedImage === img ? "ring-2 ring-yellow-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-xl text-gray-700 font-semibold mb-2">
            $
            {product.variants?.find((v) => v.ram === selectedRam)?.price ??
              "--"}
          </p>
          <p className="text-green-600 font-medium flex items-center mb-1 gap-2">
            <span>Availability:</span>
            <TiTick className="size-6" /> In stock
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Hurry up! only{" "}
            {product.variants?.find((v) => v.ram === selectedRam)?.quantity ??
              0}{" "}
            product left in stock!
          </p>

          <div className="mb-4">
            <p className="font-medium mb-1">Ram:</p>
            <div className="flex gap-2">
              {product.variants?.map((variant, id) => (
                <button
                  key={id}
                  onClick={() => setSelectedRam(variant.ram)}
                  className={`border px-3 py-1 rounded ${
                    selectedRam === variant.ram
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {variant.ram}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="font-medium mb-1">Quantity :</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 border rounded text-xl"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-8 h-8 border rounded text-xl"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
            >
              Edit product
            </button>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">
              Buy it now
            </button>
            <button
              onClick={() => handleWishlistToggle()}
              className=" p-2 rounded-full hover:bg-gray-100"
            >
              {inWishlist ? (
                <FaHeart className="size-8 text-red-500" />
              ) : (
                <CiHeart className="size-8 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditProductModal
          productId={productId}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            fetchProduct();
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProductDetails;
