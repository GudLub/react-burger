import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader.jsx";
import Main from "../Main/Main.jsx";
import styles from "./App.module.scss";
import { getIngredients } from "../../utils/API.jsx";
import ConstructorContext from "../../utils/ConstructorContext.jsx";


function App() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      return await getIngredients()
        .then((data) => setData(data.data))
        .catch((err) => console.log(err));
    }

    getData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <ConstructorContext.Provider value={data}>
      <Main />
      </ConstructorContext.Provider>
    </div>
  );
}

export default App;
