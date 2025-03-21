import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice.js";
import productReducer from "./productReducer.js";
import wishListReducer from "./wishListSlice.js";
import searchReducer from "./searchReducer.js";
import authReducer from "./authReducer.js";

const reducer = combineReducers({
  productsList: productReducer,
  cartItems: cartReducer,
  MyWishList: wishListReducer,
  searchQuery: searchReducer,
  auth: authReducer,
});

export const store = configureStore({ reducer: reducer });
