import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.scss";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useNavigate, useMatch } from 'react-router-dom';

const Ingredient = ({ image, name, price, openModal, _id, type }) => {
  const { bun, ingredients } = useSelector(
    (store) => store.burgerConstructorReducer
  );

  const navigate = useNavigate();
  const match = useMatch('ingredients/:id');
  const { id } = match?.params || {};

  const counter = useMemo(() => {
    let count = 0;
    count = ingredients.filter((ing) => ing._id === _id).length;
    if (bun && bun._id === _id) count += 2;
    return count;
  }, [bun, _id, ingredients]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { image, name, price, openModal, _id, type },
  });

  return (
    <div
    onClick={() => {
      if(id !== _id) {
        navigate(`/ingredients/${_id}`, { state: { background: true } });
      }
      openModal();
    }}
      draggable={true}
      ref={dragRef}
      className={styles.ingredient}
    >
      {counter > 0 && (
        <Counter
          className={styles.counter}
          count={counter}
          size="default"
          extraClass="m-1"
        />
      )}
      <img src={image} alt={name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Ingredient;