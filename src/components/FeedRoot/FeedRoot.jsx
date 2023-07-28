import styles from "./FeedRoot.module.scss";
import Orders from "../Orders/Orders.jsx";
import Stats from "../Stats/Stats.jsx";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connect as connectOrders,
  disconnect as disconnectOrders,
} from "../../services/actions/wsActions.jsx";
const GET_ORDERS_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

const FeedRoot = () => {
  const params = useParams();
  const location = useLocation();
  const background = location.state?.background;

  const dispatch = useDispatch();

  const orders = useSelector((store) => store.wsReducer.massiv);

  useEffect(() => {
    dispatch(connectOrders(GET_ORDERS_SERVER_URL));
    return () => dispatch(disconnectOrders());
  }, [dispatch]);

  return params.id && !(location.state && background) ? (
    <Outlet />
  ) : (
    <main className={styles.main}>
      {orders.success ? (
        <>
          <Orders orders={orders.orders} status="" />
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
