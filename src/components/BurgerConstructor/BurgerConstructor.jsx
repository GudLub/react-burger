import { useState } from "react";
import styles from "./BurgerConstructor.module.scss";
import Modal from "../Modal/Modal.jsx";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ingredientPropTypes } from "../../utils/PropTypes";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const bun = data.find((e) => e.type === "bun");

  // const between = data.filter(e => e.type !== 'bun')
  return (
    <>
      <ul className={styles.list}>
        {bun && (
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
            {data.map((e) => {
              return (
                e.type !== "bun" && (
                  <li key={e._id} className={styles.scrollEl}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={e.name}
                      price={e.price}
                      thumbnail={e.image}
                    />
                  </li>
                )
              );
            })}
          </ul>
        </li>
        {bun && (
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
          <div className={styles.price}>
            <p className="text text_type_main-medium">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            onClick={toggleModal}
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
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerConstructor;
