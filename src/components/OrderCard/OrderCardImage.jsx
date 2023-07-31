import styles from "./OrderCard.module.scss";
import { useSelector } from "react-redux";

const OrderCardImage = ({ ingredients }) => {
  const allIngredients = useSelector(
    (store) => store.burgerIngredientsReducer.data
  );

  return (
    <>
      {ingredients.map((ingredient, index) => {
        const img = allIngredients.find((el) => el._id === ingredient);
        if (ingredient !== null) {
          if (index > 0 && index <= 5) {
            return (
              <li
                key={index}
                style={{ zIndex: index }}
                className={styles.imgElement}
              >
                <img
                  src={img.image_mobile}
                  alt={img.name}
                  className={styles.image}
                />
              </li>
            );
          }
          if (ingredients.length > 5) {
            if (index === 0) {
              return (
                <li
                  key={index}
                  style={{ zIndex: index }}
                  className={`${styles.imgElement} ${styles.last}`}
                >
                  <p className={`${styles.text}`}>+{ingredients.length - 5}</p>
                  <img
                    src={img.image_mobile}
                    alt={img.name}
                    className={styles.image}
                  />
                </li>
              );
            }
          }
        }
      })}
    </>
  );
};

export default OrderCardImage;
