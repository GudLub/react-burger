import { dataPost } from "../../utils/api.jsx";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const CLEAR_BURGER_CONSTRUCTOR = "CLEAR_BURGER_CONSTRUCTOR";

export const createOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });
    dataPost(ingredients)
      .then((res) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          order: res.order.number,
        });
        dispatch({
          type: CLEAR_BURGER_CONSTRUCTOR,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
          error: err.message,
        });
      });
  };
};
