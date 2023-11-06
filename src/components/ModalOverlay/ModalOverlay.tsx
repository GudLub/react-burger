import styles from "./ModalOverlay.module.scss";
import { FC } from "react";
import { TModal } from "../../utils/types";

const ModalOverlay: FC<TModal> = ({ children, onClick }) => {

  return (

    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
   
  );
};

export default ModalOverlay;
