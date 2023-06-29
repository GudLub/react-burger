import React from "react";
import styles from "./Form.module.scss";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = React.useState("");
  const inputRef = React.useRef(null);

  return (
    <div className={styles.login}>
      <div className={styles.edit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input
          type={"text"}
          placeholder={"Укажите e-mail"}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={"e-mail"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Link to="/404">
          <Button htmlType="button" type="primary" size="medium">
            Восстановить
          </Button>
        </Link>
      </div>
      <div className={styles.actions}>
        <div className={styles.action}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login">
            <Button htmlType="button" type="secondary" size="small">
              Войти
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
