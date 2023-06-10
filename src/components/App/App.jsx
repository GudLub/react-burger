import { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader.jsx";
import Main from "../Main/Main.jsx";
import styles from "./App.module.scss";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burgerIngredientsActions.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;
