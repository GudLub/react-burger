import styles from "./FeedRoot.module.scss";
import Orders from "../Orders/Orders";
import Stats from "../Stats/Stats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connect as connectOrders,
  disconnect as disconnectOrders,
} from "../../services/actions/wsActions";

const GET_ORDERS_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

const FeedRoot = () => {
  const dispatch = useDispatch();

  const orders = useSelector((store) => store.wsReducer.massiv);

  useEffect(() => {
    dispatch(connectOrders(GET_ORDERS_SERVER_URL));
    return () => dispatch(disconnectOrders());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      {orders.success ? (
        <>
          <Orders orders={orders.orders} />
          <Stats
            orders={orders.orders}
            total={orders.total}
            totalToday={orders.totalToday}
          />
        </>
      ) : (
        <p className="text text_type_main-large mt-10">Идет загрузка...</p>
      )}
    </main>
  );
};

export default FeedRoot;
