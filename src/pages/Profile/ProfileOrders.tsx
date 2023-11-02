import styles from "./ProfileOrders.module.scss";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import {
  connectInProfile,
  disconnectInProfile,
} from "../../services/actions/wsProfileActions";

const GET_ORDERS_IN_PROFILE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders";

const ProfileOrders = () => {
  const dispatch = useAppDispatch();

  const accessTokenWithBearer = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessTokenWithBearer?.slice(7);

  const { orders, success } = useAppSelector((store) => store.wsProfileReducer.orders);

const ordersReverse = orders.slice()
.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

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
      {success ? (
        <ul className={styles.scroll}>
          {ordersReverse.map((order) => {
            return (
              <li key={order.number}>
                <OrderCard order={order} isOrderStatus={true}/>
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
