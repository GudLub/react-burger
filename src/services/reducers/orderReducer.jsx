import {
  GET_ORDERNUMBER_REQUEST,
  GET_ORDERNUMBER_SUCCESSED,
  GET_ORDERNUMBER_FAILED,
} from "../actions/orderActions.jsx";

const initialState = {
  order: 0,
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERNUMBER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDERNUMBER_SUCCESSED:
      return { ...state, order: action.order, loading: false };
    case GET_ORDERNUMBER_FAILED:
      return { ...state, order: null, loading: false };
    default:
      return state;
  }
};
