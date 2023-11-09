import styles from "./ConstructorElementSorted.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef,FC } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useAppDispatch } from "../../hooks";
import {
  deleteIngredient,
  moveIngredient,
} from "../../services/actions/burgerConstructorActions";
import { TIngredient } from "../../utils/types";

type TConstructorElementSorted = {
  index: number,
  ingredient: TIngredient,
}

const ConstructorElementSorted: FC<TConstructorElementSorted> = ({ index, ingredient }) => {
  // const { name, price, image, uuid, _id } = ingredient;
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const removeIngredient = (ingredient: TIngredient, index: string) => {
    dispatch(deleteIngredient(ingredient, index));
  };

  const [{ handlerId }, drop] = useDrop({
  accept: "element",
  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
    }
  },
  hover(item: any, monitor) {
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

    const clientOffset: any = monitor.getClientOffset()

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
const _id = ingredient._id;

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
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeIngredient(ingredient , ingredient.uuid)}
      />
    </div>
  );
};

export default ConstructorElementSorted;
