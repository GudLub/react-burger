import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerConstructorReducer.jsx";
import { burgerIngredientsReducer } from "./burgerIngredientsReducer.jsx";
import { ingredientReducer } from "./ingredientReducer.jsx";
import { orderReducer } from "./orderReducer.jsx";
import { userReducer } from "./userReducer.jsx";

export const rootReducer = combineReducers({
  burgerConstructorReducer,
  burgerIngredientsReducer,
  ingredientReducer,
  orderReducer,
  userReducer,
});
