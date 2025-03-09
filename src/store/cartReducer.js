 const CART_ADD_ITEMS = "cartAddItems";
 const CART_REMOVE_ITEMS = "cartRemoveItems";
 const CART_INCREASE_ITEMS_QUANTITY = "cartIncreaseItemsQuantity";
 const CART_DECREASE_ITEMS_QUANTITY = "cartDecreaseItemsQuantity";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Save cart state to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export function cartAdditem(product) {
  return {
    type: CART_ADD_ITEMS,
    payload: { ...product, quantity: 1 },
  };
}

export function cartRemoveItem(productId) {
  return {
    type: CART_REMOVE_ITEMS,
    payload: productId,
  };
}
export function cartIncreaseQuantity(productId) {
  return {
    type: CART_INCREASE_ITEMS_QUANTITY,
    payload: productId,
  };
}
export function cartDecreaseQuantity(productId) {
  return {
    type: CART_DECREASE_ITEMS_QUANTITY,
    payload: productId,
  };
}

export default function cartReducer(
  state = loadCartFromLocalStorage(),
  action
) {
  let newState;

  switch (action.type) {
    case CART_ADD_ITEMS:
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        newState = state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newState = [...state, action.payload];
      }
      break;

    case CART_REMOVE_ITEMS:
      newState = state.filter((item) => item.id !== action.payload);
      break;

    case CART_INCREASE_ITEMS_QUANTITY:
      newState = state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      break;

    case CART_DECREASE_ITEMS_QUANTITY:
      newState = state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      break;

    default:
      return state;
  }

  // Save updated state to localStorage
  saveCartToLocalStorage(newState);
  return newState;
}
