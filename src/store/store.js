import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartReducer.js";
import productReducer from "./productReducer.js";
import wishListReducer from "./wishListReducer.js";
import searchReducer from "./searchReducer.js";

const reducer = combineReducers({
  productsList: productReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
  searchQuery: searchReducer,
});

export const store = configureStore({ reducer: reducer });
