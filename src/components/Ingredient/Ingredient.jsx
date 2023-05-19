import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./Ingredient.module.scss";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { ingredientPropTypes } from "../../utils/PropTypes";

const Ingredient = ({ ingredient }) => {
  const { image, name, price, type } = ingredient;
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div
      onClick={() => (type === "bun" ? setCount(1) : setCount(count + 1))}
      className={styles.ingredient}
    >
      {count > 0 && (
        <Counter
          className={styles.counter}
          count={count}
          size="default"
          extraClass="m-1"
        />
      )}

      <img onClick={toggleModal} src={image} alt={name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{name}</p>
      {modal && (
        <Modal onClick={toggleModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientPropTypes
};

export default Ingredient;
