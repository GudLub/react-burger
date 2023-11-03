import FeedId from "../../components/FeedId/FeedId";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/actions/wsActions";


const GET_ORDERS_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

const FeedInfo = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(connect(GET_ORDERS_SERVER_URL));
    return () => dispatch(disconnect());
  }, []);

  const { orders, success } = useAppSelector((store) => store.wsReducer.orders);

  const order =
    success && orders.find((order) => order._id === id);

    return <section>{order && <FeedId orders={orders} />}</section>;

  };
  
  export default FeedInfo;
  








