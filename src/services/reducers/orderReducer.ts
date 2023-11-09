import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  TOrderActions
} from "../actions/orderActions";

type TInitialState = {
  order: number,
  loading: boolean,
}
const initialState: TInitialState = {
  order: 0,
  loading: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
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
