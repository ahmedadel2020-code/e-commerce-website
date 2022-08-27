import { GET_SELECTED_CURRENCY_SYMBOL } from "../actions/currency";

const initialState = {
  currencySymbol: "$",
};

const currency = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_CURRENCY_SYMBOL:
      return {
        ...state,
        currencySymbol: action.payload,
      };
    default:
      return state;
  }
};

export default currency;
