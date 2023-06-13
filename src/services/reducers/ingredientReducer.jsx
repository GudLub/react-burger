import {
  SELECT_INGREDIENT,
  CLEAR_INGREDIENT,
} from "../actions/ingredientActions.jsx";

const initialState = {
  ingredient: {},
};
export const ingredientReducer = (state = initialState, action) => {
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
