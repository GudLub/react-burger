import styles from "./Form.module.scss";
import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logIn } from "../services/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { FormEvent } from "react";

const Login = () => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const isLoginSuccess = useAppSelector(
    (store) => store.userReducer.isAuthChecked
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logIn(values));
    if (isLoginSuccess) {
      navigate(-1);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
        placeholder={"Пароль"}
        icon={"ShowIcon"}
        extraClass="mb-6"
      />
      <div>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
          disabled={!values.email || !values.password}
        >
          Войти
        </Button>
      </div>

      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы - новый пользователь?&nbsp;
        <span>
          <Link to="/register" style={{ color: "#4C4CFF" }}>
            Зарегистрироваться
          </Link>
        </span>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?&nbsp;
        <span>
          <Link to="/forgot-password" style={{ color: "#4C4CFF" }}>
            Восстановить пароль
          </Link>
        </span>
      </p>
    </form>
  );
};

export default Login;
