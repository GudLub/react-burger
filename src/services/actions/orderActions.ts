import { dataPost } from "../../utils/api";
import { TIngredient } from "../../utils/types";
import { AppDispatch } from "../../hooks";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const CLEAR_BURGER_CONSTRUCTOR = "CLEAR_BURGER_CONSTRUCTOR";

type TGetOrderNumberRequest = {
  type: typeof GET_ORDER_NUMBER_REQUEST,
  order: string,
}
const getOrderNumberRequest = (): TGetOrderNumberRequest => ({
  type: GET_ORDER_NUMBER_REQUEST,
  order: "...loading",
})

type TGetOrderNumberSuccess = {
  type: typeof GET_ORDER_NUMBER_SUCCESS,
  order: number,
}
const getOrderNumberSuccess = (order: number): TGetOrderNumberSuccess => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  order,
})

export type TClearBurgerConstructor = {
  type: typeof CLEAR_BURGER_CONSTRUCTOR,
}
const clearBurgerConstructor = (): TClearBurgerConstructor => ({
  type: CLEAR_BURGER_CONSTRUCTOR,
})

type TGetOrderNumberFailed = {
  type: typeof GET_ORDER_NUMBER_FAILED,
}
const getOrderNumberFailed = (): TGetOrderNumberFailed => ({
  type: GET_ORDER_NUMBER_FAILED,
})

export const createOrder = (ingredients: string[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(getOrderNumberRequest());
    dataPost(ingredients)
      .then((res) => {
        if (res && res.success) {
        dispatch(getOrderNumberSuccess(res.order.number));
        dispatch(clearBurgerConstructor());
        }
      })
      .catch(() => {
        dispatch(getOrderNumberFailed());
      });
  };
};

export type TOrderActions = 
| TGetOrderNumberRequest
| TGetOrderNumberSuccess
| TGetOrderNumberFailed;
