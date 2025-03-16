import React, { useState } from "react";
import { Star, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cartAdditem } from "../store/cartSlice";
import { wishListAddItem } from "../store/wishListSlice";
import NoResultsFound from "./NoResultsFound";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const products = useSelector((state) => state.productsList);
  const wishList = useSelector((state) => state.MyWishList.wishList);
  const cart = useSelector((state) => state.cartItems.cart);
  const searchQuery = useSelector((state) => state.searchQuery);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [tempGreen, setTempGreen] = useState({});

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inWishList = (id) => {
    const isInWishlist = wishList.some((item) => item.id === id);
    return isInWishlist;
  };

  const toggleWishlist = (product) => {
    dispatch(wishListAddItem(product));
    const wishListToast = wishList.find((p) => p.id === product.id);

    wishListToast
      ? showToast(`${product.title} removed from wishlist`)
      : showToast(`${product.title} added to wishlist`);
  };

  const addToCart = (product) => {
    dispatch(cartAdditem(product));
    const isInCart = cart.some((p) => p.id === product.id);
    isInCart
      ? showToast(`${product.title} is already in the cart`)
      : showToast(`${product.title} added to cart`);

    setTempGreen((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    setTimeout(() => {
      setTempGreen((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }, 2000);
  };

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < fullStars
                ? "text-yellow-400 fill-yellow-400"
                : i === fullStars && hasHalfStar
                ? "text-yellow-400 fill-yellow-400 half-star"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.rate}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      {/* Notification toast */}
      <div
        className={`fixed top-20 right-4 text-white bg-green-600 shadow-lg rounded-lg px-4 py-3 z-50 transition-all duration-300 transform flex items-center ${
          showNotification
            ? "translate-x-0 opacity-100"
            : "translate-x-8 opacity-0"
        }`}
      >
        <ShoppingBag className="mr-2 text-white" size={20} />
        <p>{notificationMessage}</p>
      </div>

      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-12 text-indigo-800">
          Featured Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 w-96 object-scale-down  "
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-2 right-2 cursor-pointer p-2 rounded-full hover:bg-gray-400 bg-gray-200 transition-colors"
                  >
                    <Heart
                      size={20}
                      className={`transition-colors   duration-300 ${
                        inWishList(product.id)
                          ? "text-red-500 fill-red-500"
                          : " text-gray-700"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-bold text-indigo-700">
                      ${product.price.toFixed(2)}
                    </p>
                    <StarRating rating={product.rating} />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className={`mt-2 w-full py-2 px-4 rounded-lg font-medium transition-all cursor-pointer duration-300 flex items-center justify-center ${
                      tempGreen[product.id]
                        ? "bg-green-500 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {tempGreen[product.id] ? (
                      <>
                        <ShoppingBag className="mr-2" size={18} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2" size={18} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <NoResultsFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
