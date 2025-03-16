import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const indexFinder = (state, id) =>
  state.cart.findIndex((item) => item.id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: loadCartFromLocalStorage() },
  reducers: {
    cartAdditem: (state, action) => {
      const existingItemIndex = indexFinder(state, action.payload.id);
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.cart);
    },
    cartRemoveItem: (state, action) => {
      const existingItemIndex = indexFinder(state, action.payload);
      if (existingItemIndex !== -1) {
        state.cart.splice(existingItemIndex, 1);
        saveCartToLocalStorage(state.cart);
      }
    },
    cartIncreaseQuantity: (state, action) => {
      const existingItemIndex = indexFinder(state, action.payload);
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
        saveCartToLocalStorage(state.cart);
      }
    },
    cartDecreaseQuantity: (state, action) => {
      const existingItemIndex = indexFinder(state, action.payload);
      if (existingItemIndex !== -1) {
        if (state.cart[existingItemIndex].quantity > 1) {
          state.cart[existingItemIndex].quantity -= 1;
        } else {
          state.cart.splice(existingItemIndex, 1);
        }
        saveCartToLocalStorage(state.cart);
      }
    },
  },
});

export const {
  cartAdditem,
  cartRemoveItem,
  cartIncreaseQuantity,
  cartDecreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
