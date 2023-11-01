import { getDataFetch } from "../../utils/api";
import { AppDispatch } from "../../hooks";
import { TIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

type TGetIngredientsRequest = {
  type: typeof GET_INGREDIENTS_REQUEST,
}
const getIngredientsRequest = (): TGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST,
})

type TGetIngredientsSuccess = {
  type: typeof GET_INGREDIENTS_SUCCESS,
  data: TIngredient[] ,
}
const getIngredientsSuccess = (data: TIngredient[]): TGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  data,
})

type TGetIngredientsFailed = {
  type: typeof GET_INGREDIENTS_FAILED,
}
const getIngredientsFailed = (): TGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED,
})

export const getIngredients = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    getDataFetch()
      .then((res) => {
        if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data));
        }
      })
      .catch(() => {
        dispatch(getIngredientsFailed());
      });
  };
};

export type TBurgerIngredientsActions =
| TGetIngredientsRequest
| TGetIngredientsSuccess
| TGetIngredientsFailed;
