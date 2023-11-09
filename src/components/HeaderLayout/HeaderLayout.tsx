import AppHeader from "../AppHeader/AppHeader";
import styles from "./HeaderLayout.module.scss";
import { Outlet } from 'react-router-dom'
import { FC } from "react";

const HeaderLayout: FC = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
