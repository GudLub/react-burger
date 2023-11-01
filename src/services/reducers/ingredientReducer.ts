import {
  SELECT_INGREDIENT,
  CLEAR_INGREDIENT,
  TIngredientActions
} from "../actions/ingredientActions";
import { TIngredient } from "../../utils/types";

type TInitialState = {
  ingredient: TIngredient | {},
}
const initialState: TInitialState = {
  ingredient: {},
};
export const ingredientReducer = (state = initialState, action: TIngredientActions) => {
  switch (action.type) {
    case SELECT_INGREDIENT: {
      return {
        ...state,
        ingredient: { ...state.ingredient, ...action.data },
      };
    }
    case CLEAR_INGREDIENT: {
      return {
        ...state,
        ingredient: {},
      };
    }
    default: {
      return state;
    }
  }
};
