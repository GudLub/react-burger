import React from "react";
import styles from "./Form.module.scss";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const Login = () => {
  const [passwordValue, setPasswordValue] = React.useState("");
  const onChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const [emailValue, setEmailValue] = React.useState("");
  const emailRef = React.useRef(null);

  return (
    <div className={styles.login}>
      <div className={styles.edit}>
        <h2 className="text text_type_main-medium">Вход</h2>
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
            Войти
          </Button>
        </Link>
      </div>
      <div className={styles.actions}>
        <div className={styles.action}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </p>
          <Link to="/register">
            <Button htmlType="button" type="secondary" size="small">
              Зарегистрироваться
            </Button>
          </Link>
        </div>
        <div className={styles.action}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to={"/forgot-password"}>
            <Button htmlType="button" type="secondary" size="small">
              Восстановить пароль
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
