import { useEffect, useState } from "react";
import styles from "./BurgerConstructor.module.scss";
import Modal from "../Modal/Modal.jsx";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import { createOrder } from "../../services/actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorElementSorted from "../ConstructorElementSorted/ConstructorElementSorted";
import {
  addBun,
  addIngredient,
} from "../../services/actions/burgerConstructorActions.jsx";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const orderNumber = useSelector((store) => store.orderReducer.order);
  const bun = useSelector((store) => store.burgerConstructorReducer.bun);
  const ingredients = useSelector(
    (store) => store.burgerConstructorReducer.ingredients
  );

  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.props.type === "bun") {
        dispatch(addBun(item.props));
      } else {
        dispatch(addIngredient(item.props));
        bun.length !== 0 && setDisabled(false);
      }
    },
  });

  const submitOrder = () => {
    const burger = [];
    burger.push(bun);
    burger.push(...ingredients);
    burger.push(bun);
    dispatch(createOrder(burger.map((item) => item._id)));
  };

  const handleOrderClick = () => {
    submitOrder();
    toggleModal();
    setDisabled(true);
  }

  useEffect(() => {
    let ingredientsPrice = 0;
    ingredients.forEach((ingredient) => {
      ingredientsPrice += ingredient.price;
    });
    bun && setTotal(bun.price * 2 + ingredientsPrice);
  }, [bun, ingredients]);

  return (
    <>
      <ul className={styles.list} ref={dropRef}>
        {bun.length !== 0 && (
          <li>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        )}
        <li>
          <ul className={styles.scroll}>
            {ingredients.length > 0 &&
              ingredients.map((e, index) => {
                e.index = index;
                return (
                  <li key={e.uuid}>
                    <ConstructorElementSorted ingredient={e} index={index} />
                  </li>
                );
              })}
          </ul>
        </li>
        {bun.length !== 0 && (
          <li>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        )}
        <li className={styles.summary}>
          {bun.length !== 0 && ingredients.length > 0 && (
            <div className={styles.price}>
              <p className="text text_type_main-medium">{total}</p>
              <CurrencyIcon type="primary" />
            </div>
          )}
          <Button
            disabled={disabled}
            onClick={() => handleOrderClick()}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </li>
      </ul>
      {modal && (
        <Modal onClick={toggleModal}>
          <OrderDetails order={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
