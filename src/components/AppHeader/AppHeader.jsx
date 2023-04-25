import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.scss'
import React from 'react'


const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <div className={styles.leftbar}>
                <button className={styles.button}>
                    <BurgerIcon type= "primary" />
                    <a href="#" className="text text_type_main-default">Конструктор</a>
                </button>
                <button className={styles.button}>
                    <ListIcon type= "secondary" />
                    <a href="#" className="text text_type_main-default text_color_inactive">Лента&nbsp;заказов</a>
                </button>
                </div>
                <div className={styles.logo}>
                <Logo />    
                </div>
                <button className={styles.button}>
                    <ProfileIcon type= "secondary" />
                    <a href="#" className="text text_type_main-default text_color_inactive">Личный&nbsp;кабинет</a>
                </button>
            </nav>
        </header>
    )
}
export default AppHeader;

