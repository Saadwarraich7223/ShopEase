import React, { useState } from "react";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setSearchQuery } from "../store/searchReducer";
import PopupMenu from "./PopupMenu";
import authService from "../auth/authentication";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const { status } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cartItems.cart);
  const searchQuery = useSelector((state) => state.searchQuery);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (profileMenuOpen) setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  // Function to close mobile menu when nav link is clicked
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    setProfileMenuOpen(false);
  };
  const handleSignoutPopup = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .then(() => navigate("/"));
    setIsMenuOpen(false);
    setProfileMenuOpen(false);
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
              {/* Home is always visible */}
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

              {/* Conditional navigation based on auth status */}
              {status ? (
                <>
                  {/* Show these links only when logged in */}
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
                </>
              ) : (
                <>
                  {/* Show these links only when logged out */}
                  <Link
                    to={"/signin"}
                    className={`px-3 py-2 font-medium transition-all duration-200 ${
                      location.pathname === "/signin"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to={"/signup"}
                    className={`px-3 py-2 font-medium transition-all duration-200 ${
                      location.pathname === "/signup"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300"
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Search, User and Cart - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {status && location.pathname === "/products" && (
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

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="text-gray-600 hover:text-indigo-600 p-1 transition-colors duration-200 flex items-center"
              >
                <User className="h-6 w-6" />
                {status && (
                  <span className="ml-1 text-sm font-medium hidden sm:inline">
                    Account
                  </span>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                  {status ? (
                    <>
                      <Link
                        to="/userprofile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Your Orders
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        className=" px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center cursor-pointer"
                        onClick={() => handleSignoutPopup()}
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className=" px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4 mr-2" /> Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className=" px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" /> Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon - Only show when logged in */}
            {status && (
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
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Only show cart when logged in */}
            {status && (
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
            )}

            <button
              onClick={toggleMenu}
              className="text-gray-600 cursor-pointer hover:text-indigo-600 p-1 focus:outline-none"
              aria-label="Toggle menu"
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
          {/* Home is always visible */}
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

          {/* Conditional navigation based on auth status for mobile */}
          {status ? (
            <>
              {/* Logged in menu items */}
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
                My Wishlist
              </Link>
            </>
          ) : (
            <>
              {/* Logged out menu items */}
              <Link
                to={"/signin"}
                onClick={handleNavLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/signin"
                    ? "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <div className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" /> Sign In
                </div>
              </Link>
              <Link
                to={"/signup"}
                onClick={handleNavLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/signup"
                    ? "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <div className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" /> Sign Up
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Account section - different based on login status */}
        {status ? (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  Account
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/userprofile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                onClick={handleNavLinkClick}
              >
                Your Profile
              </Link>
              <Link
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                onClick={handleNavLinkClick}
              >
                Your Orders
              </Link>
              <button
                className="px-3 py-2  rounded-md text-base font-medium text-red-500 hover:bg-red-50 flex items-center"
                onClick={() => handleSignoutPopup()}
              >
                <LogOut className="h-5 w-5 mr-2" /> Sign out
              </button>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                onClick={handleNavLinkClick}
              >
                Settings
              </Link>
            </div>
          </div>
        ) : null}

        {/* Search bar for products page - only when logged in */}
        {status && location.pathname === "/products" && (
          <div className="pt-2 pb-3 px-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
