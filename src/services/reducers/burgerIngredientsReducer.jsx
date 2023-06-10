import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESSED,
  GET_INGREDIENTS_FAILED,
} from "../actions/burgerIngredientsActions.jsx";

const initialState = {
  data: [],
  loading: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, loading: true };
    case GET_INGREDIENTS_SUCCESSED:
      return { ...state, data: action.data, loading: false };
    case GET_INGREDIENTS_FAILED:
      return { ...state, data: state.data, loading: false };
    default:
      return state;
  }
};
