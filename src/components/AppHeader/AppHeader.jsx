import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.scss";
import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles.leftbar}>
          <button className={styles.button}>
            <BurgerIcon type="primary" />
            <Link to='/' className="text text_type_main-default">
              Конструктор
            </Link>
          </button>
          <button className={styles.button}>
            <ListIcon type="secondary" />
            <a
              href="#"
              className="text text_type_main-default text_color_inactive"
            >
              Лента&nbsp;заказов
            </a>
          </button>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <button className={styles.button}>
          <ProfileIcon type="secondary" />
          <Link
            to="/profile"
            className="text text_type_main-default text_color_inactive"
          >
            Личный&nbsp;кабинет
          </Link>
        </button>
      </nav>
    </header>
  );
};
export default AppHeader;
