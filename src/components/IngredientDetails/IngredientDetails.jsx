import styles from "./IngredientDetails.module.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const IngredientDetails = () => {
  const { id } = useParams();
  const [ingredient, setElement] = useState(undefined);
  const ingredients = useSelector((store) => store.burgerIngredientsReducer.data);

  useEffect(() => {
    setElement(ingredients.find((ing) => ing._id === id));
  }, [ingredients]);

  return ingredient ? (
    <div className={`${styles.details} pt-10 pb-15`}>
      <h2 className={`text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium pt-4 pb-8">{ingredient.name}</p>
      <ul
        className={`${styles.nutrients} text text_type_main-default text_color_inactive`}
      >
        <li className={styles.item}>
          <p>Калории, ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={styles.item}>
          <p>Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={styles.item}>
          <p>Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={styles.item}>
          <p>Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  ) : null;
};

export default IngredientDetails;
