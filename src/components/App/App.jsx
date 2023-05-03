import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx'
import Main from '../Main/Main.jsx'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;
