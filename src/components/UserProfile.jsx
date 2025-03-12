import React, { useEffect, useState } from "react";
import {
  LogOut,
  Mail,
  MapPin,
  ShoppingCart,
  Package,
  Edit,
} from "lucide-react";
import authService from "../auth/authentication";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authReducer";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((res) => {
        setUserData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    authService.logout().then(() => dispatch(logout()));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center w-full p-4 md:px-8 lg:px-12 py-6 md:py-10 mx-auto">
      <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-2xl">
        {/* Header with gradient background - using colors that might match a shopping theme */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-24 sm:h-28 w-full relative">
          <div
            className="absolute right-3 top-3 sm:right-4 sm:top-4 bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center space-x-1 text-white cursor-pointer transition-all hover:bg-white/30"
            onClick={handleLogout}
          >
            <LogOut size={16} className="sm:hidden" />
            <LogOut size={18} className="hidden sm:block" />
            <span className="text-sm sm:text-base font-medium">Logout</span>
          </div>
        </div>

        {/* Profile content */}
        <div className="px-4 sm:px-6 py-6 sm:py-8 relative">
          {/* Avatar */}
          <div className="absolute -top-12 sm:-top-14 left-4 sm:left-6">
            <div
              className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white overflow-hidden transition-transform duration-300"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onTouchStart={() => setIsHovering(true)}
              onTouchEnd={() => setIsHovering(false)}
            >
              <span
                className={`text-xl sm:text-2xl font-bold text-white transition-opacity duration-300 ${
                  isHovering ? "opacity-0" : "opacity-100"
                }`}
              >
                {userData?.name ? getInitials(userData.name) : ""}
              </span>

              {/* Edit overlay on hover */}
              <div
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  isHovering ? "opacity-100" : "opacity-0"
                }`}
              >
                <Edit size={20} className="sm:hidden text-white" />
                <Edit size={24} className="hidden sm:block text-white" />
              </div>
            </div>
          </div>

          {/* User details */}
          <div className="mt-12 sm:mt-14">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {userData?.name ? userData.name.toUpperCase() : ""}
            </h1>

            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <div className="flex items-center text-sm sm:text-base text-gray-700">
                <Mail className="mr-2 sm:mr-3 text-gray-500" size={16} />
                <span className="break-all">{userData?.email}</span>
              </div>

              <div className="flex items-center text-sm sm:text-base text-gray-700">
                <MapPin className="mr-2 sm:mr-3 text-gray-500" size={16} />
                <span>Pakistan</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm sm:text-base font-medium rounded-lg shadow transition-transform hover:translate-y-0.5 active:translate-y-0 sm:flex-1">
              Edit Profile
            </button>
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm sm:text-base font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors sm:flex-1 flex items-center justify-center cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={16} className="mr-2" />
              My Cart
            </button>
          </div>

          {/* Shopping stats cards */}
          <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 sm:p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs sm:text-sm text-teal-600 font-medium">
                    Orders
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    8
                  </p>
                </div>
                <ShoppingCart className="text-teal-400" size={20} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 sm:p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs sm:text-sm text-teal-600 font-medium">
                    In Delivery
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    2
                  </p>
                </div>
                <Package className="text-teal-400" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
