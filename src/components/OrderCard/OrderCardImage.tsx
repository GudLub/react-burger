import styles from "./OrderCard.module.scss";
import { useAppSelector } from "../../hooks";

const OrderCardImage = ({ ingredients }: { ingredients: string[]}) => {
  const allIngredients = useAppSelector(
    (store) => store.burgerIngredientsReducer.data
  );

 return (
    <>
      {ingredients.map((ingredient, index) => {
        const img = allIngredients.find((el) => el._id === ingredient);
        if (ingredient !== null) {
          if (index > 0 && index <= 5 && img !== undefined) {
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
            if (index === 0 && img !== undefined) {
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
