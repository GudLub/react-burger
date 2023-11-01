import styles from "./Form.module.scss";
import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../services/actions/userActions";
import { useForm } from "../hooks/useForm";

const Register = () => {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const isRegisterSuccess = useSelector(
    (store) => store.userReducer.isAuthChecked
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(register(values));
    if (isRegisterSuccess) {
      navigate(-1);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChange}
        value={values.name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
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
          disabled={!values.name || !values.email || !values.password}
        >
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?&nbsp;
        <span>
          <Link to="/login" style={{ color: "#4C4CFF" }}>
            Войти
          </Link>
        </span>
      </p>
    </form>
  );
};

export default Register;
