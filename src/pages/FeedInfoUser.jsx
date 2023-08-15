import FeedId from "../components/FeedId/FeedId.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connectInProfile,
  disconnectInProfile,
} from "../services/actions/wsProfileActions.jsx";

const GET_ORDERS_IN_PROFILE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders";

const FeedInfoUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const accessTokenWithBearer = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessTokenWithBearer.slice(7);

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
  }, [orders]);

  const orders = useSelector((store) => store.wsProfileReducer.massiv);

  const order =
    orders.success && orders.orders.find((order) => order._id === id);

  return <section>{order && <FeedId orders={orders.orders} />}</section>;
};

export default FeedInfoUser;
