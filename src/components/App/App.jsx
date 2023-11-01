import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import FeedInfoUser from "../../pages/FeedInfoUser";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import FeedId from "../FeedId/FeedId"

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route path="" element={<Home />} location={background || location}>
            <Route path="ingredients/:id" element={<IngredientsId />} />
          </Route>
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:id" element={<FeedInfo />} />
          <Route path="login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="profile" element={<OnlyAuth component={<Profile />} />}>
            <Route path="" element={<ProfileInfo />} />
          </Route> 
          
          
          <Route path="profile" element={<OnlyAuth component={<Profile />} />}>
            <Route path="orders" element={<ProfileOrders />}  />
          </Route> 
          <Route path="profile" element={<OnlyAuth component={<Profile />} />}>
            <Route path="orders/:id" element={<FeedInfo/>}  />
          </Route> 
          <Route
            path="register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal onClick={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="feed/:id"
            element={
              <ModalOverlay onClick={closeModal}>
                <FeedInfo />
              </ModalOverlay>
            }
          />
          <Route
            path="profile/orders/:id"
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
