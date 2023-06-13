export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const CLEAR_INGREDIENT = "CLEAR_INGREDIENT";

export const setIngredientDetails = (ingredient) => {
  return {
    type: SELECT_INGREDIENT,
    data: ingredient,
  };
};

export const clearIngredientDetails = () => {
  return {
    type: CLEAR_INGREDIENT,
  };
};
