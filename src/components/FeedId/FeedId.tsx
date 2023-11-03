import styles from "./FeedId.module.scss";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useMemo, FC } from "react";
import CartItem from "../CartItem/CartItem";
import { TWsOrder } from "../../utils/types";

type TFeedId = {
  orders: TWsOrder[];
}
const FeedId: FC<TFeedId> = ( {orders} ) => {
  const { id } = useParams();

  const order = orders?.find((order) => order._id === id);
 
  const allIngredients = useAppSelector(
    (store) => store.burgerIngredientsReducer.data
  );
  
  const orderIngredients = useMemo(() => {
    if (order?.ingredients) {
      return order.ingredients.map((id) =>
        allIngredients.find((item) => item._id === id)
      );
    }
  }, [allIngredients]);

  const totalPrice = orderIngredients?.reduce(
    (acc, i) => acc + (i?.price || 0),
    0
  );

 
  const setTextColor = () => {
    if (order?.status === "done") {
      return `text text_type_main-default pb-15 ${styles.done}`;
    } else if (order?.status === "created") {
      return `text text_type_main-default pb-15 ${styles.created}`;
    } else if (order?.status === "pending") {
      return `text text_type_main-default pb-15 ${styles.created}`;
    }
  };

  return order ? (
    <div className={styles.container}>
      <span className={`${styles.number} text text_type_digits-default pb-10`}>
        #{order.number}
      </span>
      <p className="text text_type_main-medium pb-3">{order.name}</p>
      <p className={setTextColor()}>
        {order.status === "done" ? "Выполнен" : "Готовится"}
      </p>
      <p className="text text_type_main-medium pb-6">Состав:</p>
      <ul className={`custom-scroll ${styles.cart_list}`}>
        {orderIngredients?.map((ingredient, key) => (
          <CartItem ingredient={ingredient} key={key} />
        ))}
      </ul>
      <div className={`pt-10 ${styles.info_box}`}>
        <span className="text text_type_main-small text_color_inactive">
          <FormattedDate date={new Date(Date.parse(order.createdAt))} />
        </span>
        <div className={styles.price_box}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : (
    <p>Error</p>
  );
};

export default FeedId;
