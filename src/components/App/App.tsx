import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getIngredients } from "../../services/actions/burgerIngredientsActions";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../../pages/Home";
import HeaderLayout from "../HeaderLayout/HeaderLayout";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import NotFound from "../../pages/NotFound";
import Profile from "../../pages/Profile/Profile";
import ProfileInfo from "../../pages/Profile/ProfileInfo";
import IngredientsId from "../../pages/IngredientsId";
import Feed from "../../pages/Feed";
import FeedInfo from "../../pages/FeedInfo/FeedInfo";
import ProfileOrders from "../../pages/Profile/ProfileOrders";
import { checkUserAuth } from "../../services/actions/userActions";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

type TStateLocation = Location & {
  state: {
    background: Location;
  };
}

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background: TStateLocation  = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HeaderLayout />}>
          <Route path="react-burger" element={<Home />}>
            <Route path="ingredients/:id" element={<IngredientsId />} />
          </Route>
          <Route path="react-burger/feed" element={<Feed />} />
          <Route path="react-burger/feed/:id" element={<FeedInfo />} />
          <Route path="react-burger/login" element={<OnlyUnAuth onlyUnAuth={true} component={<Login />} />} />
          <Route path="react-burger/profile" element={<OnlyAuth onlyUnAuth={false} component={<Profile />} />}>
            <Route path="" element={<ProfileInfo />} />
          </Route> 
          
          
          <Route path="react-burger/profile" element={<OnlyAuth onlyUnAuth={false} component={<Profile />} />}>
            <Route path="orders" element={<ProfileOrders />}  />
          </Route> 
          <Route path="react-burger/profile" element={<OnlyAuth onlyUnAuth={false} component={<Profile />} />}>
            <Route path="orders/:id" element={<FeedInfo/>}  />
          </Route> 
          <Route
            path="react-burger/register"
            element={<OnlyUnAuth onlyUnAuth={true} component={<Register />} />}
          />
          <Route
            path="react-burger/forgot-password"
            element={<OnlyUnAuth onlyUnAuth={true} component={<ForgotPassword />} />}
          />
          <Route
            path="react-burger/reset-password"
            element={<OnlyUnAuth onlyUnAuth={true} component={<ResetPassword />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="react-burger/ingredients/:id"
            element={
              <Modal onClick={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="react-burger/feed/:id"
            element={
              <ModalOverlay onClick={closeModal}>
                <FeedInfo />
              </ModalOverlay>
            }
          />
          <Route
            path="react-burger/profile/orders/:id"
            element={
              <Modal onClick={closeModal}>
                <FeedInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
