export const GET_SELECTED_CURRENCY_SYMBOL = "GET_SELECTED_CURRENCY_SYMBOL";

export const getSelectedCurrencySymbol = (payload) => ({
  type: GET_SELECTED_CURRENCY_SYMBOL,
  payload,
});
