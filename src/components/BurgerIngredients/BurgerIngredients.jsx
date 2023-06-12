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
import { useMemo } from "react";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const data = useSelector((store) => store.burgerIngredientsReducer.data);

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const containerRef = useRef();

  const type = useMemo(
    () => [
      { name: "Булки", type: "bun", ref: bunRef },
      { name: "Соусы", type: "sauce", ref: sauceRef },
      { name: "Начинки", type: "main", ref: mainRef },
    ],
    []
  );

  const [current, setCurrent] = useState(type[0].ref);
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
      setCurrent(bunRef);
    }
    if (
      containerRef.current.getBoundingClientRect().top >
      sauceRef.current.getBoundingClientRect().top
    ) {
      setCurrent(sauceRef);
    }
    if (
      containerRef.current.getBoundingClientRect().top >
      mainRef.current.getBoundingClientRect().top
    ) {
      setCurrent(mainRef);
    }
  };

  const handleClick = (ref) => {
    setCurrent(ref);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <div className="mt-10">
        <h1 className="text text_type_main-large pb-5">Собери&nbsp;бургер</h1>
        <ul className={styles.menu}>
          {type.map((type, index) => {
            return (
              <Tab
                key={index}
                value={type.name}
                active={current === type.ref}
                onClick={() => {
                  handleClick(type.ref);
                }}
              >
                {type.name}
              </Tab>
            );
          })}
        </ul>
      </div>
      <div className={styles.scroll} ref={containerRef} onScroll={handleScroll}>
        {type.map((type, index) => {
          return (
            <React.Fragment key={index}>
              <h2 className="text text_type_main-medium mt-10" ref={type.ref}>
                {type.name}
              </h2>
              <ul className={styles.list}>
                {data.map((data) => {
                  return (
                    data.type === type.type && (
                      <li key={data._id} className="text text_type_main-medium">
                        <Ingredient
                          {...data}
                          openModal={() => {
                            openModal(data);
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
