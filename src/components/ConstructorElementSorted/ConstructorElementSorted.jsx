import styles from "./ConstructorElementSorted.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  deletIngredient,
  moveIngredient,
} from "../../services/actions/burgerConstructorActions";

const ConstructorElementSorted = ({ index, ingredient }) => {
  const { name, price, image, uuid, _id } = ingredient;
  const dispatch = useDispatch();
  const ref = useRef();

  const removeIngredient = (ingredient, index) => {
    dispatch(deletIngredient(ingredient, index));
  };

  const [, drop] = useDrop({
    accept: "element",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragElIndex = item.index;
      const hoverElIndex = { index };
      dispatch(moveIngredient(dragElIndex, hoverElIndex));
      item.index = hoverElIndex;
    },
  });

  const [, drag] = useDrag({
    type: "element",
    item: { _id, index },
  });
  drag(drop(ref));

  return (
    <div ref={ref} className={styles.scrollEl}>
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

export default ConstructorElementSorted;
