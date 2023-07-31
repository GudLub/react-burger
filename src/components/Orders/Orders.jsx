import styles from "./Orders.module.scss";
import OrderCard from "../OrderCard/OrderCard.jsx";

const Orders = ({ orders }) => {
  return (
    <section>
      <h1 className="text text_type_main-large pb-5 mt-10">
        Лента&nbsp;заказов
      </h1>

      <ul className={styles.scroll}>
        {orders.map((order) => {
          return (
            <li key={order.number}>
              <OrderCard order={order} isOrderStatus={false} nav='feed'/>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Orders;
