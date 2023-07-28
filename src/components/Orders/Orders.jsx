import styles from "./Orders.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { diffDays, diffToString } from "../../utils/orders";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const Orders = ({ orders, status }) => {
  const margin = status === "" ? "mt-10" : "";

  const navigate = useNavigate();
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.data
  );

  const totalPrice = (burger) => {
    let sum = 0;
    burger.forEach((ing) => {
      if (ing !== null) {
        sum += ingredients.find((el) => el._id === ing).price;
      }
    });
    return sum;
  };
  return (
    <section className={margin}>
      {status === "" && (
        <h1 className="text text_type_main-large pb-5">Лента&nbsp;заказов</h1>
      )}
      <ul className={styles.scroll}>
        {orders.map((order) => {
          const _id = order._id;
          const orderDate = new Date(Date.parse(order.createdAt));
          const todayDate = new Date();
          const diffDate = diffDays(orderDate, todayDate);
          const orderMinutes =
            orderDate.getMinutes().toString().length < 2
              ? `0${orderDate.getMinutes()}`
              : orderDate.getMinutes();
          const statusOrder =
            order.status === "done" ? "Выполнен" : "Готовится";

          return (
            <li
              className={styles.order}
              key={order.number}
              onClick={() => {
                navigate(`/feed/${_id}`);
              }}
            >
              <div className={styles.number}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                  {`${diffToString(
                    diffDate
                  )}, ${orderDate.getHours()}:${orderMinutes}
                      i-GMT${
                        orderDate.getTimezoneOffset() > 0
                          ? `+${orderDate.getTimezoneOffset() / 60}`
                          : orderDate.getTimezoneOffset() / 60
                      }`}
                </p>
              </div>
              <h2 className={`${styles.h2} text text_type_main-medium mb-6`}>
                {order.name}
                <span className="text_type_main-small pt-2">
                  {status !== "" && statusOrder}
                </span>
              </h2>
              <div className={styles.price}>
                <ul className={styles.burgeringredients}>
                  {order.ingredients.map((ingredient, index) => {
                    if (ingredient !== null) {
                      if (index > 0 && index <= 5) {
                        return (
                          <li
                            key={uuidv4()}
                            style={{ zIndex: index }}
                            className={styles.imgElement}
                          >
                            <img
                              src={
                                ingredients.find((el) => el._id === ingredient)
                                  .image_mobile
                              }
                              alt={
                                ingredients.find((el) => el._id === ingredient)
                                  .name
                              }
                              className={styles.image}
                            />
                          </li>
                        );
                      }
                      if (order.ingredients.length > 5) {
                        if (index === 0) {
                          return (
                            <li
                              key={uuidv4()}
                              style={{ zIndex: index }}
                              className={`${styles.imgElement} ${styles.last}`}
                            >
                              <p className={`${styles.text}`}>
                                +{order.ingredients.length - 5}
                              </p>
                              <img
                                src={
                                  ingredients.find(
                                    (el) => el._id === ingredient
                                  ).image_mobile
                                }
                                alt={
                                  ingredients.find(
                                    (el) => el._id === ingredient
                                  ).name
                                }
                                className={styles.image}
                              />
                            </li>
                          );
                        }
                      }
                    }
                  })}
                </ul>
                <div className={styles.price}>
                  <p className="text text_type_digits-default">
                    {totalPrice(order.ingredients)}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Orders;
