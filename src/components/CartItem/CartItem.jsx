import styles from "./CartItem.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function CartItem({ ingredient }) {
  return (
    <li className={styles.item} key={ingredient._id}>
      <img src={ingredient.image_mobile} alt={ingredient.name} />
      <p className="text text_type_main-small">{ingredient.name}</p>
      <div className={styles.price_box}>
        <span className="text text_type_digits-default pr-3">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
}

export default CartItem;
