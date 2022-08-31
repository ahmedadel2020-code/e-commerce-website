import { GET_CATEGORY_NAME } from "../actions/category";

const initialState = {
  categoryName: "all",
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_NAME:
      return {
        ...state,
        categoryName: action.payload,
      };
    default:
      return state;
  }
};

export default category;
