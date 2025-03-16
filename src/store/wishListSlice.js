import { createSlice } from "@reduxjs/toolkit";

const loadWishListFromLocalStorage = () => {
  const storedWishList = localStorage.getItem("wishList");
  return storedWishList ? JSON.parse(storedWishList) : [];
};

const saveWishListToLocalStorage = (wishList) => {
  localStorage.setItem("wishList", JSON.stringify(wishList));
};

const indexFinder = (wishList, id) =>
  wishList.findIndex((item) => item.id === id);

const wishListSlice = createSlice({
  name: "wishList",
  initialState: { wishList: loadWishListFromLocalStorage() },
  reducers: {
    wishListAddItem: (state, action) => {
      const existingItemIndex = indexFinder(state.wishList, action.payload.id);
      if (existingItemIndex !== -1) {
        state.wishList.splice(existingItemIndex, 1);
      } else {
        state.wishList.push(action.payload);
      }
      saveWishListToLocalStorage(state.wishList);
    },
    wishListRemoveItem: (state, action) => {
      const existingItemIndex = indexFinder(state.wishList, action.payload);
      if (existingItemIndex !== -1) {
        state.wishList.splice(existingItemIndex, 1);
        saveWishListToLocalStorage(state.wishList);
      }
    },
  },
});

export const { wishListAddItem, wishListRemoveItem } = wishListSlice.actions;
export default wishListSlice.reducer;
