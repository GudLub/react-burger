import React from "react";
import styles from "./Form.module.scss";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [passwordValue, setPasswordValue] = React.useState("");
  const onChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  return (
    <div className={styles.login}>
      <div className={styles.edit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput
          onChange={onChange}
          value={passwordValue}
          name={"password"}
          placeholder={"Введите новый пароль"}
          icon={"ShowIcon"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"password"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Link to="/404">
          <Button htmlType="button" type="primary" size="medium">
            Сохранить
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

export default ResetPassword;
