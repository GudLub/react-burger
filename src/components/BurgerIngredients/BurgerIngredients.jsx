import styles from './BurgerIngredients.module.scss'
import data from '../../utils/data';
import Ingredient from '../Ingredient/Ingredient';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from "react";

const type = [
    { name: 'Булки', type: 'bun' },
    { name: 'Соусы', type: 'sauce' },
    { name: 'Начинки', type: 'main' }]
   
const BurgerIngredients = () => {
    const [current, setCurrent] = useState(type[0].name)
    

    

    return (
        <section>
            <div className="mt-10">
                <h1 className="text text_type_main-large pb-5">Собери&nbsp;бургер</h1>
                <ul className={styles.menu}>
                    {type.map((e, index) => {
                        return   <Tab key={index} value={e.name} active={current === e.name} onClick={setCurrent}>
                        {e.name}
                      </Tab>
                    })}
                </ul>
            </div>
        <div className={styles.scroll}>
            {type.map((e, index) => {
                return <React.Fragment key={index}>
                    <h2 className="text text_type_main-medium mt-10">{e.name}</h2>
                    <ul className={styles.list}>
                        {data.map((evt) => {
                            return evt.type === e.type &&
                                <li key={evt._id}  className="text text_type_main-medium">
                                    <Ingredient image={evt.image} name={evt.name} price={evt.price} type={evt.type}/>
                                </li>
                        })}
                    </ul>
                </React.Fragment>
            })}
        </div>
        
        </section>
    )
}
export default BurgerIngredients;