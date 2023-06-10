import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.scss";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

const Ingredient = (props) => {
  const { image, name, price, openModal } = props;
  const { bun, ingredients } = useSelector(
    (store) => store.burgerConstructorReducer
  );

  const counter = useMemo(() => {
    let count = 0;
    for (let { _id } of ingredients) if (_id === props._id) count++;
    if (bun && bun._id === props._id) count += 2;
    return count;
  }, [bun, props._id, ingredients]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { props },
  });

  return (
    <div
      onClick={openModal}
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
};

export default Ingredient;
