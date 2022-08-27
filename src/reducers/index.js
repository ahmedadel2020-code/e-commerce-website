// import reducers

import { combineReducers } from "redux";
import currency from "./currency";
import cart from "./cart";

const allReducers = combineReducers({
  currency,
  cart,
});

export default allReducers;
