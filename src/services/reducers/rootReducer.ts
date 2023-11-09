import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerConstructorReducer";
import { burgerIngredientsReducer } from "./burgerIngredientsReducer";
import { ingredientReducer } from "./ingredientReducer";
import { orderReducer } from "./orderReducer";
import { userReducer } from "./userReducer";
import { wsReducer } from "./wsReducer";
import { wsProfileReducer } from "./wsProfileReducer";


export const rootReducer = combineReducers({
  burgerConstructorReducer,
  burgerIngredientsReducer,
  ingredientReducer,
  orderReducer,
  userReducer,
  wsReducer,
  wsProfileReducer,
});
