import {
  PasswordInput,
  Input,
  EmailInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useForm } from "../../hooks/useForm";
import { patchUserFetch } from "../../services/actions/userActions"
import Modal from "../../components/Modal/Modal";
import { FormEvent } from "react";

const ProfileInfo = () => {
  const {name, email, success} = useAppSelector(store => store.userReducer);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  
  const { values, handleChange, setValues } = useForm({
    name: name,
    email: email,
    password: '',
  });
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(patchUserFetch(values));
    toggleModal();
  };

  function onClickCancel(e: FormEvent) {
    e.preventDefault();
    setValues({ name: name, email: email, password: '' });
  }
  const onChangeInput =
  values.name !== name || values.email !== email || values.password;
 
  return (
    <form
    onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", paddingLeft: "60px" }}
    >
      <Input
        type={"text"}
        placeholder={"имя"}
        onChange={handleChange}
        value={values.name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        icon={values.name ? "EditIcon" : "CloseIcon"}
        extraClass="mb-6"
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        // icon={values.email ? "EditIcon" : "CloseIcon"}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
          placeholder={"Пароль"}
        icon="EditIcon"
      />
      
         {onChangeInput ? (
            <div style={{ display: "flex", justifyContent: "flex-end" }} className={'pt-3'}>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={onClickCancel}
              >
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          ) : null}
          {modal && (
        <Modal onClick={toggleModal}>
          <div>
          {success 
              ? <p className="text text_type_main-medium m-20">Ваши данные успешно изменены</p> 
              : <p className="text text_type_main-medium m-20">Произошла ошибка. Попробуйте снова</p>}
          </div>
        </Modal>
      )}
    </form>
    
  );
};

export default ProfileInfo;
