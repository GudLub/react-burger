
import data from '../../utils/data.json';
import styles from './BurgerConstructor.module.scss';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
const BurgerConstructor = () => {
    return (
<>
<ul className={styles.list}>
<li>
  <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={data[0].image}
      /></li>

      <li><ul className={styles.scroll}>
      {data.map((e) => {
        return e.type !== 'bun' &&
        <li className={styles.scrollEl}><DragIcon type="primary" />
        <ConstructorElement
        text={e.name}
        price={e.price}
        thumbnail={e.image}
      /></li>     
      })}
      </ul></li>
      <li>
        <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={data[0].image}
      /></li>
<li className={styles.summary}>
    <div className={styles.price}>
     <p className="text text_type_main-medium">610</p> 
     <CurrencyIcon type="primary" />
    </div>
    <Button htmlType="button" type="primary" size="large">
  Оформить заказ
</Button>
</li>
</ul>

</>
    )
}
export default BurgerConstructor;