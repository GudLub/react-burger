import styles from "./IngredientDetails.module.scss";
import { ingredientPropTypes } from "../../utils/PropTypes";


const IngredientDetails = ({ ingredient }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredient;
  return (
    <div className={`${styles.details} pt-10 pb-15`}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img src={image_large} alt={name} />
      <p className="text text_type_main-medium pt-4 pb-8">{name}</p>
      <ul
        className={`${styles.nutrients} text text_type_main-default text_color_inactive`}
      >
        <li className={styles.item}>
          <p>Калории, ккал</p>
          <p className="text text_type_digits-default">{calories}</p>
        </li>
        <li className={styles.item}>
          <p>Белки, г</p>
          <p className="text text_type_digits-default">{proteins}</p>
        </li>
        <li className={styles.item}>
          <p>Жиры, г</p>
          <p className="text text_type_digits-default">{fat}</p>
        </li>
        <li className={styles.item}>
          <p>Углеводы, г</p>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes
};

export default IngredientDetails;