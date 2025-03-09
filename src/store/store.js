import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import wishListReducer from "./wishListreducer";
import searchReducer from "./searchReducer";

const reducer = combineReducers({
  productsList: productReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
  searchQuery: searchReducer,
});

export const store = configureStore({ reducer: reducer });
