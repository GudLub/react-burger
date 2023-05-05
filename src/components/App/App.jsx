import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader.jsx";
import Main from "../Main/Main.jsx";
import styles from "./App.module.scss";

function App() {
  const serverUrl = "https://norma.nomoreparties.space/api/ingredients";
  const [state, setState] = useState([]);

  useEffect(() => {
    const getData = async () => {
      return await fetch(serverUrl)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => setState(data.data))
        .catch((err) => console.log(err));
    };

    getData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main data={state} />
    </div>
  );
}

export default App;
