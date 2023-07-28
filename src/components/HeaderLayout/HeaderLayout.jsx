import AppHeader from "../AppHeader/AppHeader.jsx";
import styles from "./HeaderLayout.module.scss";
import { Outlet } from 'react-router-dom'

const HeaderLayout = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
