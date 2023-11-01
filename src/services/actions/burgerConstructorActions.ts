import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types";

export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

type TAddBun = {
  type: typeof ADD_BUN,
  bun: TIngredient,
}
export const addBun = (bun: TIngredient): TAddBun => {
  return {
    type: ADD_BUN,
    bun: bun,
  };
};

type TAddIngredient = {
  type: typeof ADD_INGREDIENT,
  ingredient: TIngredient,
}
export const addIngredient = (ingredient: TIngredient): TAddIngredient => {
  const uuid = uuidv4();
  return {
    type: ADD_INGREDIENT,
    ingredient: { ...ingredient, uuid },
  };
};

type TMoveIngredient = {
  type: typeof MOVE_INGREDIENT,
  dragFrom: number,
  hoverTo: number,
}
export const moveIngredient = (dragIndex: number, hoverIndex: number): TMoveIngredient => {
  return {
    type: MOVE_INGREDIENT,
    dragFrom: dragIndex,
    hoverTo: hoverIndex,
  };
};

type TDeleteIngredient = {
  type: typeof DELETE_INGREDIENT,
  ingredient: TIngredient,
  index: string,
}
export const deleteIngredient = (ingredient: TIngredient, index: string): TDeleteIngredient => {
  return {
    type: DELETE_INGREDIENT,
    ingredient,
    index,
  };
};

export type TBurgerConstructorActions = 
| TAddBun
| TAddIngredient
| TMoveIngredient
| TDeleteIngredient;