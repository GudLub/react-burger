import {
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
  TBurgerConstructorActions
} from "../actions/burgerConstructorActions";
import { CLEAR_BURGER_CONSTRUCTOR, TClearBurgerConstructor } from "../actions/orderActions";
import { TIngredient } from "../../utils/types";

type TInitialState = {
  bun: TIngredient[];
  ingredients: TIngredient[];
}
const initialState: TInitialState = {
  bun: [],
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions | TClearBurgerConstructor) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.bun,
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    case MOVE_INGREDIENT:
      const movedIngredients = [...state.ingredients];
      movedIngredients.splice(
        action.dragFrom,
        0,
        movedIngredients.splice(action.hoverTo, 1)[0]
      );
      return {
        ...state,
        ingredients: movedIngredients,
      };
    case DELETE_INGREDIENT:
      const newIngredientsState = { ...state };
      const indexIngredient = newIngredientsState.ingredients.findIndex(
        (ingredient) => ingredient.uuid === action.index
      );
      if (indexIngredient !== -1) {
        newIngredientsState.ingredients.splice(indexIngredient, 1);
      }
      return {
        ...state,
        ingredients: [...newIngredientsState.ingredients],
      };
    case CLEAR_BURGER_CONSTRUCTOR:
      return initialState;
    default:
      return state;
  }
};
