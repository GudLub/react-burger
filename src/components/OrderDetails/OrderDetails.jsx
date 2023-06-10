import styles from "./OrderDetails.module.scss";
import done from "../../images/done.svg";
import PropTypes from "prop-types";

const OrderDetails = ({ order }) => {
  return (
    <div className={`${styles.order} pt-30 pb-30`}>
      <p className="text text_type_digits-large">{order}</p>
      <p className="text text_type_main-medium pt-8">
        идентификатор&nbsp;заказа
      </p>
      <img src={done} alt="done" className="pt-15 pb-15" />
      <div className={styles.status}>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  numberOrder: PropTypes.number,
};

export default OrderDetails;
