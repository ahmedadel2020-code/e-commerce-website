import {
  ADD_PRODUCT_TO_CART,
  CART_OVERLAY_STATE,
  DECREMENT_PRODUCT_QUANTITY,
  GET_TOTAL_PRICE,
  INCREMENT_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_CART,
} from "../actions/cart";

const initialState = {
  products: [],
  cartQuantity: 0,
  totalPrice: 0,
  cartOverlayState: false,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const product = action.payload.newProduct.prices.filter(
        (price) => price.currency.symbol === "$"
      );

      return {
        ...state,
        products: [
          ...state.products,
          {
            product: action.payload.newProduct,
            quantity: 1,
            selectedAttributes: action.payload.selectedAttributes,
          },
        ],
        cartQuantity: state.cartQuantity + 1,
        totalPrice: (
          Number(state.totalPrice) + Number(product[0].amount)
        ).toFixed(2),
      };

    case REMOVE_PRODUCT_FROM_CART:
      state.products.forEach((stateProduct) => {
        if (stateProduct.product.id === action.payload.productId) {
          if (
            JSON.stringify(stateProduct.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
          ) {
            const productPrice = stateProduct.product.prices.filter(
              (price) => price.currency.symbol === action.payload.currencySymbol
            );
            state.totalPrice = (
              Number(state.totalPrice) - Number(productPrice[0].amount)
            ).toFixed(2);
          }
        }
      });
      return {
        ...state,
        products: state.products.filter((stateProduct) => {
          if (
            JSON.stringify(stateProduct.selectedAttributes) !==
            JSON.stringify(action.payload.selectedAttributes)
          ) {
            return stateProduct;
          }
          return stateProduct.product.id !== action.payload.productId;
        }),
        cartQuantity: state.cartQuantity - 1,
      };

    case INCREMENT_PRODUCT_QUANTITY:
      state.products.forEach((stateProduct) => {
        if (stateProduct.product.id === action.payload.productId) {
          if (
            JSON.stringify(stateProduct.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
          ) {
            stateProduct.quantity += 1;
            const productPrice = stateProduct.product.prices.filter(
              (price) => price.currency.symbol === action.payload.currencySymbol
            );
            state.totalPrice = (
              Number(state.totalPrice) + Number(productPrice[0].amount)
            ).toFixed(2);
          }
        }
      });

      return {
        ...state,
        cartQuantity: state.cartQuantity + 1,
      };

    case DECREMENT_PRODUCT_QUANTITY:
      state.products.forEach((stateProduct) => {
        if (stateProduct.product.id === action.payload.productId) {
          if (
            JSON.stringify(stateProduct.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
          ) {
            stateProduct.quantity -= 1;
            const productPrice = stateProduct.product.prices.filter(
              (price) => price.currency.symbol === action.payload.currencySymbol
            );
            state.totalPrice = (
              Number(state.totalPrice) - Number(productPrice[0].amount)
            ).toFixed(2);
          }
        }
      });
      return {
        ...state,
        cartQuantity: state.cartQuantity - 1,
      };

    case GET_TOTAL_PRICE:
      let totalPrice = 0;

      state.products.forEach((stateProduct) => {
        const productPrice = stateProduct.product.prices.filter(
          (price) => price.currency.symbol === action.payload
        );
        totalPrice = (
          Number(totalPrice) +
          Number(productPrice[0].amount * stateProduct.quantity)
        ).toFixed(2);
      });
      state.totalPrice = totalPrice;

      return {
        ...state,
      };

    case CART_OVERLAY_STATE:
      return {
        ...state,
        cartOverlayState: action.payload,
      };
    default:
      return state;
  }
};

export default cart;
