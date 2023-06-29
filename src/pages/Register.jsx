import React from "react";
import styles from "./Form.module.scss";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const Register = () => {
    
  const [passwordValue, setPasswordValue] = React.useState("");
  const onChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);

  return (
    <div className={styles.login}>
      <div className={styles.edit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          name={"name"}
          error={false}
          ref={nameRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={"e-mail"}
          error={false}
          ref={emailRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput
          onChange={onChange}
          value={passwordValue}
          name={"password"}
          placeholder={"Пароль"}
          icon={"ShowIcon"}
        />
        <Link to="/404">
          <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </Link>
      </div>
      <div className={styles.actions}>
        <div className={styles.action}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
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

export default Register;
