import { serverUrl, checkResponse } from "../../utils/constances";

export const GET_ORDERNUMBER_REQUEST = "GET_ORDERNUMBER_REQUEST";
export const GET_ORDERNUMBER_SUCCESSED = "GET_ORDERNUMBER_SUCCESSED";
export const GET_ORDERNUMBER_FAILED = "GET_ORDERNUMBER_FAILED";
export const CLEAR_BURGERCONSTRUCTOR = "CLEAR_BURGERCONSTRUCTOR";

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

export const getPost = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDERNUMBER_REQUEST,
    });
    request("orders", dataPost(ingredients))
      .then((res) => {
        dispatch({
          type: GET_ORDERNUMBER_SUCCESSED,
          order: res.order.number,
        });
        dispatch({
          type: CLEAR_BURGERCONSTRUCTOR,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDERNUMBER_FAILED,
          error: err.message,
        });
      });
  };
};
