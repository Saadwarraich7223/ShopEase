import React, { useState } from "react";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSearchQuery } from "../store/searchReducer";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const searchQuery = useSelector((state) => state.searchQuery);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close mobile menu when nav link is clicked
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed right-0 left-0 z-50 mb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to={"/"}>
              <div className="flex-shrink-0 flex items-center">
                <span className="text-indigo-600 font-bold text-xl">
                  ShopEase
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to={"/"}
                className={`px-3 py-2 font-medium transition-all duration-200 ${
                  location.pathname === "/"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300"
                }`}
              >
                Home
              </Link>
              <Link
                to={"/products"}
                className={`px-3 py-2 font-medium transition-all duration-200 ${
                  location.pathname === "/products"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300"
                }`}
              >
                Shop
              </Link>
              <Link
                to={"/cart"}
                className={`px-3 py-2 font-medium transition-all duration-200 ${
                  location.pathname === "/cart"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300"
                }`}
              >
                Cart
              </Link>
              <Link
                to={"/wishlist"}
                className={`px-3 py-2 font-medium transition-all duration-200 ${
                  location.pathname === "/wishlist"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300"
                }`}
              >
                Wishlist
              </Link>
            </div>
          </div>

          {/* Search, User and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {location.pathname === "/products" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
              </div>
            )}

            <button className="text-gray-600 hover:text-indigo-600 p-1 transition-colors duration-200">
              <User className="h-6 w-6" />
            </button>

            <Link to={"/cart"}>
              <button className="text-gray-600 cursor-pointer hover:text-indigo-600 p-1 relative transition-colors duration-200">
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to={"/cart"}>
              <button className="text-gray-600 cursor-pointer hover:text-indigo-600 p-1 relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </Link>

            <button
              onClick={toggleMenu}
              className="text-gray-600 cursor-pointer hover:text-indigo-600 p-1 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to={"/"}
            onClick={handleNavLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/"
                ? "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
            }`}
          >
            Home
          </Link>
          <Link
            to={"/products"}
            onClick={handleNavLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/products"
                ? "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
            }`}
          >
            Shop
          </Link>
          <Link
            to={"/cart"}
            onClick={handleNavLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/cart"
                ? "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
            }`}
          >
            Cart
          </Link>
          <Link
            to={"/wishlist"}
            onClick={handleNavLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/wishlist"
                ? "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
            }`}
          >
            My wishlist
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Account</div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
              onClick={handleNavLinkClick}
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
              onClick={handleNavLinkClick}
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
              onClick={handleNavLinkClick}
            >
              Sign out
            </a>
          </div>
        </div>
        <div className="pt-2 pb-3 px-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            {location.pathname === "/products" && (
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
