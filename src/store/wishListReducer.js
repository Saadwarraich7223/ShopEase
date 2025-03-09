const WISHLIST_ADD_ITEMS = "wishListAddItems";
const WISHLIST_REMOVE_ITEMS = "wishListRmoveItems";

const loadWishListFromLocalStorage = () => {
  const storedWishList = localStorage.getItem("wishList");
  return storedWishList ? JSON.parse(storedWishList) : [];
};

const saveWishListToLocalStorage = (wishList) => {
  localStorage.setItem("wishList", JSON.stringify(wishList));
};

export function wishListAddItem(product) {
  return {
    type: WISHLIST_ADD_ITEMS,
    payload: product,
  };
}
export function wishListRemoveItem(id) {
  return {
    type: WISHLIST_REMOVE_ITEMS,
    payload: id,
  };
}

export default function wishListReducer(
  state = loadWishListFromLocalStorage(),
  action
) {
  let newWishList;
  switch (action.type) {
    case WISHLIST_ADD_ITEMS:
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Remove item if it exists (toggle off)
        newWishList = state.filter((item) => item.id !== action.payload.id);
      } else {
        // Add item if it doesn't exist (toggle on)
        newWishList = [...state, action.payload];
      }
      break;

    case WISHLIST_REMOVE_ITEMS:
      newWishList = state.filter((item) => item.id !== action.payload);
      break;

    default:
      return state;
  }

  saveWishListToLocalStorage(newWishList);
  return newWishList;
}
