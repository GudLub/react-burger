import styles from "./BurgerConstructorRoot.module.scss";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Outlet, useParams, useLocation } from 'react-router-dom';

const BurgerConstructorRoot = () => {
  const params = useParams();
  const location = useLocation();
  const background = location.state?.background;
  return (params.id && !(location.state && background)) ? 
  (<Outlet />) :
    (<main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

export default BurgerConstructorRoot;
