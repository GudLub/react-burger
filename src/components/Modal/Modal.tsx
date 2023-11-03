import { createPortal } from "react-dom";
import { useEffect, FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.scss";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { TModal } from "../../utils/types";

const modalRoot = document.getElementById("modal");

const Modal: FC<TModal> = ({ children, onClick }) => {
  useEffect(() => {
    const closeByEsc = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClick();
      }
    };
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [onClick]);

  if(!modalRoot) {
    return null;
  }

  return createPortal(
    <ModalOverlay onClick={onClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.buttonClose} onClick={onClick}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
