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
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useDrop } from "react-dnd";
import ConstructorElementSorted from "../ConstructorElementSorted/ConstructorElementSorted";
import {
  addBun,
  addIngredient,
} from "../../services/actions/burgerConstructorActions";
import { useNavigate } from "react-router-dom";
import { TIngredient } from "../../utils/types";

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const orderNumber = useAppSelector((store) => store.orderReducer.order);
  const orderLoading = useAppSelector((store) => store.orderReducer.loading);
  const bun = useAppSelector((store) => store.burgerConstructorReducer.bun);
  const ingredients = useAppSelector((store) => store.burgerConstructorReducer.ingredients);



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
    drop(item: TIngredient) {
      if (item.type === "bun") {
        dispatch(addBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
  });

  const submitOrder = () => {
    // const burger: TIngredient[] = [];
    // burger.push(bun);
    // burger.push(...ingredients);
    // burger.push(bun);
    const ingredientsId = ingredients.map(item => item._id);
    const bunId = bun[0]._id;
    const burger = [bunId, ...ingredientsId, bunId];
    dispatch(createOrder(burger));
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
    ingredients?.forEach((ingredient) => {
      ingredientsPrice += ingredient.price;
    });
    let bunPrice = 0;
    bun?.forEach((bun) => {
      bunPrice += bun.price;
    });
    setTotal(bunPrice + ingredientsPrice);
    if (bun.length !== 0 && ingredients.length !== 0) {
      setDisabled(false);
    }
  }, [bun, ingredients]);

  return bun ? (
    <>
      <ul className={styles.list} ref={dropRef}>
        {bun.length !== 0 && (
          <li>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun[0].name} (верх)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
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
              text={`${bun[0].name} (низ)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
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
  ) : (
    <p>Error</p>
  );
};

export default BurgerConstructor;
