import styles from "./Form.module.scss";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../hooks";
import { resetPasswordFetch } from "../services/actions/userActions";
import { FormEvent } from "react";


const ResetPassword = () => {
  const { values, handleChange } = useForm({ password: '', token: ''});
  const isResetSuccess = useAppSelector(store => store.userReducer.reset);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPasswordFetch(values));
    if (isResetSuccess) {
      navigate('/react-burger/login');
    }
  }

  if (!localStorage.getItem("email")) {
    return <Navigate to={"/react-burger/forgot-password"} replace={true} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
        placeholder={"Введите новый пароль"}
        extraClass="mb-6"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={handleChange}
        value={values.token}
        name={"token"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?&nbsp;
        <span>
          <Link to="/react-burger/login" style={{ color: "#4C4CFF" }}>
            Войти
          </Link>
        </span>
      </p>
    </form>
  );
};

export default ResetPassword;
