import styles from "./BurgerIngredients.module.scss";
import Ingredient from "../Ingredient/Ingredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  setIngredientDetails,
  clearIngredientDetails,
} from "../../services/actions/ingredientActions";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const data = useSelector((store) => store.burgerIngredientsReducer.data);

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const containerRef = useRef();

  const type = [
    { name: "Булки", type: "bun", ref: bunRef },
    { name: "Соусы", type: "sauce", ref: sauceRef },
    { name: "Начинки", type: "main", ref: mainRef },
  ];

  const [current, setCurrent] = useState(type[0].type);
  const [modal, setModal] = useState(false);

  const openModal = (ingredient) => {
    dispatch(setIngredientDetails(ingredient));
    setModal(true);
  };

  const closeModal = () => {
    dispatch(clearIngredientDetails());
    setModal(false);
  };

  const handleScroll = () => {
    if (
      containerRef.current.getBoundingClientRect().top >
      bunRef.current.getBoundingClientRect().top
    ) {
      setCurrent("bun");
    }
    if (
      containerRef.current.getBoundingClientRect().top >
      sauceRef.current.getBoundingClientRect().top
    ) {
      setCurrent("sauce");
    }
    if (
      containerRef.current.getBoundingClientRect().top >
      mainRef.current.getBoundingClientRect().top
    ) {
      setCurrent("main");
    }
  };

  return (
    <section>
      <div className="mt-10">
        <h1 className="text text_type_main-large pb-5">Собери&nbsp;бургер</h1>
        <ul className={styles.menu}>
          {type.map((e, index) => {
            return (
              <Tab
                key={index}
                value={e.name}
                active={current === e.type}
                onClick={() => setCurrent(e.type)}
              >
                {e.name}
              </Tab>
            );
          })}
        </ul>
      </div>
      <div className={styles.scroll} ref={containerRef} onScroll={handleScroll}>
        {type.map((e, index) => {
          return (
            <React.Fragment key={index}>
              <h2 className="text text_type_main-medium mt-10" ref={e.ref}>
                {e.name}
              </h2>
              <ul className={styles.list}>
                {data.map((evt) => {
                  return (
                    evt.type === e.type && (
                      <li key={evt._id} className="text text_type_main-medium">
                        <Ingredient
                          {...evt}
                          openModal={() => {
                            openModal(evt);
                          }}
                        />
                      </li>
                    )
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })}
      </div>
      {modal && (
        <Modal onClick={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
