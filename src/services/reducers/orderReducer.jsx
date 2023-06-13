import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
} from "../actions/orderActions.jsx";

const initialState = {
  order: 0,
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_NUMBER_SUCCESS:
      return { ...state, order: action.order, loading: false };
    case GET_ORDER_NUMBER_FAILED:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
