import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../hooks";
import { logOut } from "../../services/actions/userActions";
import { checkUserAuth } from "../../services/actions/userActions";
import { useEffect } from "react";

function Profile() {
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logOut());
    navigate("/react-burger");
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return params.id && !(location.state && background) ? (
    <Outlet />
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        marginTop: "120px",
        marginLeft: "60px",
      }}
    >
      <nav style={{ maxWidth: "320px" }}>
        <NavLink
          end
          to="/react-burger/profile"
          className={pathname !== "/react-burger/profile" ? `text_color_inactive` : ""}
        >
          <p className="text text_type_main-medium pb-6">Профиль</p>
        </NavLink>
        <NavLink
          end
          to="/react-burger/profile/orders"
          className={
            pathname !== "/react-burger/profile/orders" ? `text_color_inactive` : ""
          }
        >
          <p className="text text_type_main-medium pb-6">История заказов</p>
        </NavLink>

        <Button
          htmlType="button"
          type="secondary"
          className="text_color_inactive"
          onClick={onLogout}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <span className="text text_type_main-medium">Выход</span>
        </Button>

        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </div>
  );
}

export default Profile;
