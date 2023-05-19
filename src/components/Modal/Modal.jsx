import { createPortal } from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.scss";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

const Modal = ({ children, onClick }) => {
  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === "Escape") {
        onClick();
      }
    };
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [onClick]);

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
Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Modal;
