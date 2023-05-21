import { useContext, useEffect, useState } from "react";
import styles from "./BurgerConstructor.module.scss";
import Modal from "../Modal/Modal.jsx";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import ConstructorContext from "../../utils/ConstructorContext";
import { getPost } from "../../utils/API.jsx"

const BurgerConstructor = () => {
  const data = useContext(ConstructorContext);
  const bun = data.find((e) => e.type === "bun");
  const between = data.filter(e => e.type !== 'bun');
  
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState();

  const toggleModal = () => {
    setModal(!modal);
  };
  
  const ingredientId = () => {
    const ingrId = [];
    bun && ingrId.push(bun._id)
    between.forEach(e => {ingrId.push(e._id);})
    bun && ingrId.push(bun._id)
    return ingrId;
  }
 

 
    const getOrder = async () => {
      return await getPost({ingredientId})
        .then((data) => setOrder(data.order.number))
        .catch((err) => console.log(err));
    }

   


  useEffect(() => {
    let ingredientsPrice = 0;
    between.forEach((ingredient) => {
      ingredientsPrice += ingredient.price
    });
    bun && setTotal(bun.price*2 + ingredientsPrice)
  }, [data])

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
           {between && between.map((e) => {
              return (
                  <li key={e._id} className={styles.scrollEl}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={e.name}
                      price={e.price}
                      thumbnail={e.image}
                    />
                  </li>
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
            <p className="text text_type_main-medium">{total}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            onClick={() => {toggleModal(); getOrder()}}
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
          <OrderDetails order={order}/>
        </Modal>
      )}
    </>
  );
};



export default BurgerConstructor;
