import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './Ingredient.module.scss';
import PropTypes from 'prop-types';

const Ingredient = ({image, name, price, type}) => {

    const [count, setCount] = useState(0);

    return (
        <div onClick={() => type === 'bun' ? setCount(1) : setCount(count + 1)} className={styles.ingredient}>
            {count>0 && <Counter className={styles.counter} count={count} size="default" extraClass="m-1"/>}
           
            <img src={image} alt={name} />
            <div className={styles.price}>
            <p className='text text_type_digits-default'>
          {price}</p>
           <CurrencyIcon />
            </div>
            <p className="text text_type_main-default">{name}</p>
        </div>
    );
};

Ingredient.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

export default Ingredient;