export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const INCREMENT_PRODUCT_QUANTITY = "INCREMENT_PRODUCT_QUANTITY";
export const DECREMENT_PRODUCT_QUANTITY = "DECREMENT_PRODUCT_QUANTITY";
export const GET_TOTAL_PRICE = "GET_TOTAL_PRICE";
export const CART_OVERLAY_STATE = "CART_OVERLAY_STATE";

export const addProductToCart = (payload) => ({
  type: ADD_PRODUCT_TO_CART,
  payload,
});

export const removeProductFromCart = (payload) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload,
});

export const incrementProductQuantity = (payload) => ({
  type: INCREMENT_PRODUCT_QUANTITY,
  payload,
});

export const decrementProductQuantity = (payload) => ({
  type: DECREMENT_PRODUCT_QUANTITY,
  payload,
});

export const getTotalPrice = (payload) => ({
  type: GET_TOTAL_PRICE,
  payload,
});

export const cartOverlayState = (payload) => ({
  type: CART_OVERLAY_STATE,
  payload,
});
