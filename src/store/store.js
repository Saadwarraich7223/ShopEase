import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice.js";
import productReducer from "./productReducer.js";
import wishListReducer from "./wishListSlice.js";
import searchReducer from "./searchReducer.js";
import authReducer from "./authSlice.js";
import notificationReducer from "./notificationSlice.js";

export const store = configureStore({
  reducer: {
    productsList: productReducer,
    cartItems: cartReducer,
    MyWishList: wishListReducer,
    searchQuery: searchReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
});
