import styles from "./Orders.module.scss";
import OrderCard from "../OrderCard/OrderCard";
import { TWsOrder } from "../../utils/types";
import { FC } from "react";

type TOrders = {
  orders: TWsOrder[],
}

const Orders: FC<TOrders> = ({ orders }) => {
  return (
    <section>
      <h1 className="text text_type_main-large pb-5 mt-10">
        Лента&nbsp;заказов
      </h1>

      <ul className={styles.scroll}>
        {orders.map((order) => {
          return (
            <li key={order.number}>
              <OrderCard order={order} isOrderStatus={false}/>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Orders;
