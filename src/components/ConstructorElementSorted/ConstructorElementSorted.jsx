import styles from "./ConstructorElementSorted.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  deleteIngredient,
  moveIngredient,
} from "../../services/actions/burgerConstructorActions";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/PropTypes";

const ConstructorElementSorted = ({ index, ingredient }) => {
  const { name, price, image, uuid, _id } = ingredient;
  const dispatch = useDispatch();
  const ref = useRef();

  const removeIngredient = (ingredient, index) => {
    dispatch(deleteIngredient(ingredient, index));
  };

  const [, drop] = useDrop({
    accept: "element",
    drop(item) {
      if (!ref.current) {
        return;
      }
      const dragElementIndex = item.index;
      const hoverElementIndex = { index };
      dispatch(moveIngredient(dragElementIndex, hoverElementIndex));
      item.index = hoverElementIndex;
    },
  });

  const [, drag] = useDrag({
    type: "element",
    item: { _id, index },
  });
  drag(drop(ref));

  return (
    <div ref={ref} className={styles.scrollElement}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => removeIngredient({ ingredient }, uuid)}
      />
    </div>
  );
};

ConstructorElementSorted.propTypes = {
  ingredient: ingredientPropTypes,
  index: PropTypes.number.isRequired,
};

export default ConstructorElementSorted;
