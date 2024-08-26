import { useAppSelector } from "../../hooks";
import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";

export type TProtected = {
  onlyUnAuth: boolean;
  component: JSX.Element
}

const Protected: FC<TProtected> = ({ onlyUnAuth = false, component }: TProtected) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useAppSelector((store) => store.userReducer.isAuthChecked);
  const user = useAppSelector((store) => store.userReducer.accessToken);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/react-burger" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/react-burger/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: TProtected) => (
  <Protected onlyUnAuth={true} component={component} />
);