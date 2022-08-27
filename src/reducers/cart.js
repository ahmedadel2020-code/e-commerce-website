import {
  ADD_PRODUCT_TO_CART,
  DECREMENT_PRODUCT_QUANTITY,
  INCREMENT_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_CART,
} from "../actions/cart";

const initialState = {
  products: [],
  cartQuantity: 0,
  totalPrice: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const product = action.payload.prices.filter(
        (price) => price.currency.symbol === "$"
      );

      return {
        ...state,
        products: [...state.products, { product: action.payload, quantity: 1 }],
        cartQuantity: state.cartQuantity + 1,
        totalPrice: (
          Number(state.totalPrice) + Number(product[0].amount)
        ).toFixed(2),
      };

    case REMOVE_PRODUCT_FROM_CART:
      state.products.forEach((stateProduct) => {
        if (stateProduct.product.id === action.payload.productId) {
          // stateProduct.quantity -= 1;
          const productPrice = stateProduct.product.prices.filter(
            (price) => price.currency.symbol === action.payload.currencySymbol
          );
          state.totalPrice = (
            Number(state.totalPrice) - Number(productPrice[0].amount)
          ).toFixed(2);
        }
      });
      return {
        ...state,
        products: state.products.filter(
          (stateProduct) => stateProduct.product.id !== action.payload.productId
        ),
        cartQuantity: state.cartQuantity - 1,
      };

    case INCREMENT_PRODUCT_QUANTITY:
      state.products.forEach((stateProduct) => {
        if (stateProduct.product.id === action.payload.productId) {
          stateProduct.quantity += 1;
          const productPrice = stateProduct.product.prices.filter(
            (price) => price.currency.symbol === action.payload.currencySymbol
          );
          state.totalPrice = (
            Number(state.totalPrice) + Number(productPrice[0].amount)
          ).toFixed(2);
        }
      });

      return {
        ...state,
        cartQuantity: state.cartQuantity + 1,
      };

    case DECREMENT_PRODUCT_QUANTITY:
      state.products.forEach((stateProduct) => {
        if (stateProduct.product.id === action.payload.productId) {
          stateProduct.quantity -= 1;
          const productPrice = stateProduct.product.prices.filter(
            (price) => price.currency.symbol === action.payload.currencySymbol
          );
          state.totalPrice = (
            Number(state.totalPrice) - Number(productPrice[0].amount)
          ).toFixed(2);
        }
      });
      return {
        ...state,
        cartQuantity: state.cartQuantity - 1,
      };
    default:
      return state;
  }
};

export default cart;
