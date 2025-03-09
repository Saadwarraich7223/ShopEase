import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Star, X, ShoppingCart, Heart } from "lucide-react";
import { wishListRemoveItem } from "../store/wishListreducer";
import { cartAdditem } from "../store/cartReducer";
import { Link } from "react-router-dom";

const WishList = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishList);

  const handleRemoveFromWishlist = (id) => {
    dispatch(wishListRemoveItem(id));
  };

  const handleAddToCart = (item) => {
    dispatch(cartAdditem(item));
  };

  // Function to render star ratings
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={index < Math.floor(rating) ? "currentColor" : "none"}
          />
        ))}
        <span className="ml-1 text-sm text-gray-200">({rating})</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="flex gap-4 items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <Heart className="text-red-500 mr-2 h-6 w-6" fill="currentColor" />
      </div>

      {wishlistItems && wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
          <img
            src="/api/placeholder/200/200"
            alt="Empty wishlist"
            className="mb-6 opacity-50"
          />
          <h2 className="text-2xl font-medium text-gray-600 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add items you love to your wishlist. Review them anytime and easily
            move them to the cart.
          </p>
          <Link to={"/products"}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 cursor-pointer rounded-lg transition duration-200">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm  transition-transform duration-300 hover:shadow-md hover:scale-[1.01]"
            >
              <div className="flex flex-col md:flex-row ">
                {/* Product Image - smaller with price overlay */}
                <div className="md:w-1/4 h-48 md:h-56 relative  ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain z-50   transition-transform duration-500  hover:scale-105 hover:-translate-y-3   "
                  />

                  {/* Price and rating overlay - modern design */}
                  <div className="absolute bottom-0 left-0  right-0 opacity-80 bg-black p-3">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-bold">
                          ${item.price}
                        </span>
                        {item.discount && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {item.discount}% OFF
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between  ">
                        {renderRating(item.rating.rate)}
                        {item.originalPrice && (
                          <span className="text-gray-300 text-sm line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Information */}
                <div className="p-5 md:w-3/4 flex flex-col justify-between relative">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        {item.title}
                      </h2>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="text-gray-400 hover:text-red-500 transition duration-200"
                        aria-label="Remove from wishlist"
                      >
                        <X className="h-5 w-5 cursor-pointer " />
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      className=" bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center cursor-pointer text-sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex cursor-pointer items-center justify-center text-sm"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
