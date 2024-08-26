import styles from "./Form.module.scss";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { restorePassword } from "../services/actions/userActions";
import { useForm } from "../hooks/useForm";
import { FormEvent } from "react";

const ForgotPassword = () => {
  const { values, handleChange } = useForm({ email: ''});
  const isPostSuccess = useAppSelector(store => store.userReducer.success);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(restorePassword(values));
    if (isPostSuccess) {
      navigate('/react-burger/reset-password');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        placeholder={"Укажите E-mail"}
        isIcon={false}
        extraClass="mb-6"
      />
      <div>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
      </div>

      <p className="text text_type_main-default text_color_inactive mb-4">
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

export default ForgotPassword;
