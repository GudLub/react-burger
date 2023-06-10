import { serverUrl, checkResponse } from "../../utils/constances";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESSED = "GET_INGREDIENTS_SUCCESSED";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

const request = async (url, options) => {
  const res = await fetch(`${serverUrl}/${url}`, options);
  return checkResponse(res);
};

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request("ingredients")
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESSED,
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: err.message,
        });
      });
  };
};
