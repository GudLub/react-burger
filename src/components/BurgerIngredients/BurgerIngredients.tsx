import styles from "./BurgerIngredients.module.scss";
import Ingredient from "../Ingredient/Ingredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef, MouseEvent } from "react";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  setIngredientDetails,
  clearIngredientDetails,
} from "../../services/actions/ingredientActions";
import { useMemo, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TIngredient } from "../../utils/types";

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((store) => store.burgerIngredientsReducer.data);

  const bunRef = useRef<HTMLInputElement>(null);
  const sauceRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);

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

  const openModal = (ingredient: TIngredient) => {
    dispatch(setIngredientDetails(ingredient));
  };

  const closeModal = () => {
    dispatch(clearIngredientDetails());
    setModal(false);
  };

  const handleScroll = () => {
    if (containerRef.current?.getBoundingClientRect().top! > bunRef.current?.getBoundingClientRect().top!) {
      setCurrent(bunRef);
    }
    if (containerRef.current?.getBoundingClientRect().top! > sauceRef.current?.getBoundingClientRect().top!) {
      setCurrent(sauceRef);
    }
    if (containerRef.current?.getBoundingClientRect().top! > mainRef.current?.getBoundingClientRect().top!) {
      setCurrent(mainRef);
    }
  };

  const handleClick = (ref: any) => {
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
                          ingredient = {data}
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
