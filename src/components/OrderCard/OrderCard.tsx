import styles from "./OrderCard.module.scss";
import { diffDays, diffToString } from "../../utils/orders";
import { useAppSelector } from "../../hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, FC } from "react";
import OrderCardImage from "./OrderCardImage";
import { Link } from "react-router-dom";
import { TWsOrder } from "../../utils/types";

type TOrderCard = {
  order: TWsOrder,
  isOrderStatus: boolean
}

const OrderCard: FC<TOrderCard> = ({ order, isOrderStatus }) => {
  const ingredients = useAppSelector(
    (store) => store.burgerIngredientsReducer.data
  );

  const orderIngredients = useMemo(() => {
    if (order.ingredients) {
      return order.ingredients.map((id) =>
        ingredients.find((item) => item._id === id)
      );
    }
  }, [ingredients]);

  const totalPrice = orderIngredients?.reduce(
    (acc, i) => acc + (i?.price || 0),
    0
  );

  const statusOrder = order.status === "done" ? "Выполнен" : "Готовится";

  const orderDate = new Date(Date.parse(order.createdAt));
  const todayDate = new Date();
  const diffDate = diffDays(orderDate, todayDate);
  const orderMinutes =
    orderDate.getMinutes().toString().length < 2
      ? `0${orderDate.getMinutes()}`
      : orderDate.getMinutes();

  return (
    order && (
      <Link state={{ background: false }} to={`/feed/${order._id}`}>
        <div className={styles.order}>
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
              {isOrderStatus && statusOrder}
            </span>
          </h2>
          <div className={styles.price}>
            <ul className={styles.burgeringredients}>
              <OrderCardImage ingredients={order.ingredients} />
            </ul>

            <div className={styles.totalPrice}>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    )
  );
};

export default OrderCard;
