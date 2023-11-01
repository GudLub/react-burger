import { useEffect, useState } from "react";
import styles from "./BurgerConstructor.module.scss";
import Modal from "../Modal/Modal";
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
} from "../../services/actions/burgerConstructorActions";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const orderNumber = useSelector((store) => store.orderReducer.order);
  const orderLoading = useSelector((store) => store.orderReducer.loading);
  const bun = useSelector((store) => store.burgerConstructorReducer.bun);
  const ingredients = useSelector(
    (store) => store.burgerConstructorReducer.ingredients
  );

  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        dispatch(addBun(item));
      } else {
        dispatch(addIngredient(item));
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
    if (!localStorage.getItem("refreshToken")) {
      navigation("/login");
    } else {
      submitOrder();
      openModal();
      setDisabled(true);
    }
  };

  useEffect(() => {
    let ingredientsPrice = 0;
    ingredients.forEach((ingredient) => {
      ingredientsPrice += ingredient.price;
    });
    bun && setTotal(bun.price * 2 + ingredientsPrice);
    if (bun.length !== 0 && ingredients.length !== 0) {
      setDisabled(false);
    }
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
      {modal && orderLoading && (
        <Modal onClick={closeModal}>
          <p className="text text_type_main-medium m-20">
            Ваш заказ формируется, минутку...
          </p>
        </Modal>
      )}
      {modal && !orderLoading && (
        <Modal onClick={closeModal}>
          <OrderDetails order={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
