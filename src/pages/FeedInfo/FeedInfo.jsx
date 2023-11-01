import FeedId from "../../components/FeedId/FeedId.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/actions/wsActions";


const GET_ORDERS_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

const FeedInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(connect(GET_ORDERS_SERVER_URL));
    return () => dispatch(disconnect());
  }, []);

  const orders = useSelector((store) => store.wsReducer.massiv);

  const order =
    orders.success && orders.orders.find((order) => order._id === id);

    return <section>{order && <FeedId orders={orders.orders} />}</section>;
  };
  
  export default FeedInfo;
  








