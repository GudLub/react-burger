import { TIngredient } from "../../utils/types";

export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const CLEAR_INGREDIENT = "CLEAR_INGREDIENT";

type TSetIngredientDetails = {
  type: typeof SELECT_INGREDIENT,
  data: TIngredient,
}
export const setIngredientDetails = (ingredient: TIngredient): TSetIngredientDetails => {
  return {
    type: SELECT_INGREDIENT,
    data: ingredient,
  };
};

type TClearIngredientDetails = {
  type: typeof CLEAR_INGREDIENT,
}
export const clearIngredientDetails = ():TClearIngredientDetails => {
  return {
    type: CLEAR_INGREDIENT,
  };
};

export type TIngredientActions =
| TSetIngredientDetails
| TClearIngredientDetails;