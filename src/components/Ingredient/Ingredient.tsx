import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.scss";
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../hooks";
import { useNavigate, useMatch } from 'react-router-dom';
import { TIngredient } from "../../utils/types";

export type TIngredientComponent = {
  ingredient: TIngredient,
  openModal: () => void,
}
const Ingredient = ({ ingredient, openModal }: TIngredientComponent) => {
  const ingredients = useAppSelector(
    (store) => store.burgerConstructorReducer.ingredients
  );
 
  const bun = useAppSelector(
    (store) => store.burgerConstructorReducer.bun
  );

  const navigate = useNavigate();
  const match = useMatch('/react-burgeringredients/:id');
  const { id } = match?.params || {};

  const counter = useMemo(() => {
    const burger = [...bun, ...ingredients];
      const count = burger.reduce((acc, item) => {
            if (item._id === ingredient._id) {
              ingredient.type !== 'bun' ? acc += 1 : acc += 2 ;
            }
            return acc;
          },
          0);
      return count;
  }, [bun, ingredient._id, ingredients]);
 

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient, openModal },
  });

  return ingredient ? (
    <div
    onClick={() => {
      if(id !== ingredient._id) {
        navigate(`/react-burger/ingredients/${ingredient._id}`, { state: { background: true } });
      }
      openModal();
    }}
      draggable={true}
      ref={dragRef}
      className={styles.ingredient}
    >
      {counter > 0 && (
        <div className={styles.counter}>
        <Counter
          count={counter}
          size="default"
          extraClass="m-1"
        />
        </div>
      )}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  ) : (
    <div>Error</div>
  );
};


export default Ingredient;