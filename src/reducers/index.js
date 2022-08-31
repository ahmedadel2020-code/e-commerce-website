// import reducers

import { combineReducers } from "redux";
import currency from "./currency";
import cart from "./cart";
import category from "./category";

const allReducers = combineReducers({
  currency,
  cart,
  category,
});

export default allReducers;
