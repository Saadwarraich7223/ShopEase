import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

import { cartAdditem } from "../store/cartSlice";
import { wishListAddItem } from "../store/wishListSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsList);
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Handle unavailable product
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for is unavailable or doesn't exist.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    dispatch(cartAdditem(product, quantity));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleWishlist = (product) => {
    dispatch(wishListAddItem(product));
    setIsWishlisted(true);
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${
              index < Math.floor(rating.rate)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            fill={index < Math.floor(rating.rate) ? "currentColor" : "none"}
          />
        ))}
        <span className="ml-2 text-gray-600">({rating.rate})</span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-down">
          <Check className="h-5 w-5 mr-2" />
          <p>Product added to cart successfully!</p>
        </div>
      )}

      {/* Breadcrumb navigation */}
      <div className="bg-gray-50 py-3 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center text-sm text-gray-500">
            <button
              onClick={() => navigate("/products")}
              className="hover:text-indigo-600"
            >
              Products
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium truncate">
              {product.title}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Product Image Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-2xl relative">
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="w-full transition-transform duration-500 hover:scale-105 hover:-translate-y-3 h-75 object-contain p-8"
              />
            </div>

            {/* Thumbnail images - can be added here */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="border border-indigo-500 rounded-lg p-2">
                <img
                  src={product.image || "/api/placeholder/100/100"}
                  alt={product.title}
                  className="w-full h-16 object-contain"
                />
              </div>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-2 hover:border-gray-300"
                >
                  <img
                    src={"/api/placeholder/100/100"}
                    alt={`${product.title} - View ${index + 2}`}
                    className="w-full h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center mb-4">
              {renderRating(product.rating || 4.5)}
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {discount && (
                <p className="text-green-600">
                  You save $
                  {product.price > 500
                    ? (product.price * 0.05).toFixed(2)
                    : (product.price * 0.2).toFixed(2)}{" "}
                  ( {product.price > 500 ? "5 % off" : "2 % off"})
                </p>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Truck className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Shield className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>2 year extended warranty</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <RotateCcw className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>30 day money back guarantee</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 w-10 h-10 rounded-l flex items-center justify-center"
                >
                  -
                </button>
                <div className="w-16 h-10 border-y border-gray-200 flex items-center justify-center font-medium">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 w-10 h-10 rounded-r flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={() => handleWishlist(product)}
                className={`border ${
                  isWishlisted
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-gray-300 text-gray-700"
                } hover:border-gray-400 font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center`}
              >
                <Heart
                  className={`h-5 w-5 mr-2 ${
                    isWishlisted ? "fill-current" : ""
                  }`}
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="mt-8 text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
