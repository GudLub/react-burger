import styles from "./Main.module.scss";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import { ingredientPropTypes } from "../../utils/PropTypes";
import PropTypes from "prop-types";

const Main = ({ data }) => {
  return (
    <main className={styles.main}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default Main;
