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
import { ingredientPropTypes } from "./types.jsx";

const ConstructorElementSorted = ({ index, ingredient }) => {
  const { name, price, image, uuid, _id } = ingredient;
  const dispatch = useDispatch();
  const ref = useRef();

  const removeIngredient = (ingredient, index) => {
    dispatch(deleteIngredient(ingredient, index));
  };

  const [{ handlerId }, drop] = useDrop({
  accept: "element",
  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
    }
  },
  hover(item, monitor) {
    if (!ref.current) {
      return
    }
    const dragIndex = item.index
    const hoverIndex = index

    if (dragIndex === hoverIndex) {
      return
    }


    const hoverBoundingRect = ref.current?.getBoundingClientRect()

    const hoverMiddleY =
      (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()

    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }
    dispatch(moveIngredient(dragIndex, hoverIndex))
    item.index = hoverIndex
  },
})
const [, drag] = useDrag({
  type: 'element',
  item: () => {
    return { _id, index }
  },
})
drag(drop(ref))

  return (
    <div ref={ref} data-handler-id={handlerId} className={styles.scrollElement}>
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
