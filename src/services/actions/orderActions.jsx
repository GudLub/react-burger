import { serverUrl, checkResponse } from "../../utils/constances";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const CLEAR_BURGER_CONSTRUCTOR = "CLEAR_BURGER_CONSTRUCTOR";

const request = async (url, options) => {
  const res = await fetch(`${serverUrl}/${url}`, options);
  return checkResponse(res);
};

const dataPost = (ingredients) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  };
};

export const createOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });
    request("orders", dataPost(ingredients))
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
