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
                    <p className="text text_type_main-default">Конструктор</p>
                </button>
                <button className={styles.button}>
                    <ListIcon type= "secondary" />
                    <p className="text text_type_main-default text_color_inactive">Лента&nbsp;заказов</p>
                </button>
                </div>
                <div className={styles.logo}>
                <Logo />    
                </div>
                <button className={styles.button}>
                    <ProfileIcon type= "secondary" />
                    <p className="text text_type_main-default text_color_inactive">Личный&nbsp;кабинет</p>
                </button>
            </nav>
        </header>
    )
}
export default AppHeader;

