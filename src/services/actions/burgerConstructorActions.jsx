import { v4 as uuidv4 } from "uuid";

export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export const addBun = (bun) => {
  return {
    type: ADD_BUN,
    bun: bun,
  };
};

export const addIngredient = (ingredient) => {
  const uuid = uuidv4();
  return {
    type: ADD_INGREDIENT,
    ingredient: { ...ingredient, uuid },
  };
};

export const moveIngredient = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_INGREDIENT,
    dragFrom: dragIndex,
    hoverTo: hoverIndex,
  };
};

export const deleteIngredient = (ingredient, index) => {
  return {
    type: DELETE_INGREDIENT,
    ingredient,
    index,
  };
};
