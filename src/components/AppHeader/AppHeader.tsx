import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.scss";
import { NavLink, useMatch } from "react-router-dom";

const AppHeader = () => {
  const constructorLink = useMatch("/react-burger");
  const feedLink = useMatch("/react-burger/feed");
  const profileLink = useMatch("/react-burger/profile");

  const style = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `text text_type_main-default`
      : `text text_type_main-default text_color_inactive`;

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles.leftbar}>
          <button className={styles.button}>
            {constructorLink ? (
              <BurgerIcon type="primary" />
            ) : (
              <BurgerIcon type="secondary" />
            )}

            <NavLink to={{ pathname: "/react-burger" }} className={style}>
              Конструктор
            </NavLink>
          </button>
          <button className={styles.button}>
            {feedLink ? (
              <ListIcon type="primary" />
            ) : (
              <ListIcon type="secondary" />
            )}
            <NavLink to={{ pathname: "/react-burger/feed" }} className={style}>
              Лента&nbsp;заказов
            </NavLink>
          </button>
        </div>
        <div className={styles.logo}>
          <NavLink to="/react-burger">
            <Logo />
          </NavLink>
        </div>
        <button className={styles.button}>
          {profileLink ? (
            <ProfileIcon type="primary" />
          ) : (
            <ProfileIcon type="secondary" />
          )}
          <NavLink to={{ pathname: "/react-burger/profile" }} className={style}>
            Личный&nbsp;кабинет
          </NavLink>
        </button>
      </nav>
    </header>
  );
};
export default AppHeader;
