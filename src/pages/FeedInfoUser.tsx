import FeedId from "../components/FeedId/FeedId";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/index";
import { useEffect } from "react";
import {
  connectInProfile,
  disconnectInProfile,
} from "../services/actions/wsProfileActions";

const GET_ORDERS_IN_PROFILE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders";

const FeedInfoUser = () => {
   const dispatch = useAppDispatch();
   const { id } = useParams();
   const accessTokenWithBearer = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessTokenWithBearer?.slice(7);
  const orders = useAppSelector((store) => store.wsProfileReducer.orders);

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

 const order =
     orders.success && orders.orders.find((order) => order._id === id);

 return <section>{order && <FeedId orders={orders.orders} />}</section>;
};

export default FeedInfoUser;
