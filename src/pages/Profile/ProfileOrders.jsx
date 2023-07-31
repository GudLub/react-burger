import styles from "./ProfileOrders.module.scss";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connectInProfile,
  disconnectInProfile,
} from "../../services/actions/wsProfileActions.jsx";

const GET_ORDERS_IN_PROFILE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders";

const ProfileOrders = () => {
  const dispatch = useDispatch();

  const accessTokenWithBearer = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessTokenWithBearer.slice(7);

  const orders = useSelector((store) => store.wsProfileReducer.massiv);

  const ordersReverse = orders.success ? [...orders.orders].reverse() : [];

  useEffect(() => {
    dispatch(
      connectInProfile(
        `${GET_ORDERS_IN_PROFILE_SERVER_URL}?token=${accessTokenWithoutBearer}`
      )
    );

    return () =>
      dispatch(
        disconnectInProfile(
          `${GET_ORDERS_IN_PROFILE_SERVER_URL}?token=${accessTokenWithoutBearer}`
        )
      );
  }, [dispatch, accessTokenWithoutBearer]);

  return (
    <>
      {orders.success ? (
        <ul className={styles.scroll}>
          {ordersReverse.map((order) => {
            return (
              <li key={order.number}>
                <OrderCard order={order} isOrderStatus={true} nav='profile/orders' />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text text_type_main-large mt-10">Идет загрузка...</p>
      )}
    </>
  );
};

export default ProfileOrders;
