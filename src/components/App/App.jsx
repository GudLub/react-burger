import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burgerIngredientsActions.jsx";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "../../pages/Home.jsx";
import HeaderLayout from "../HeaderLayout/HeaderLayout.jsx";
import Login from "../../pages/Login.jsx";
import Register from "../../pages/Register.jsx";
import ForgotPassword from "../../pages/ForgotPassword.jsx";
import ResetPassword from "../../pages/ResetPassword.jsx";
import NotFound from "../../pages/NotFound.jsx";
import Profile from "../../pages/Profile/Profile.jsx"
import ProfileInfo from "../../pages/Profile/ProfileInfo.jsx"
import IngredientsId from "../../pages/IngredientsId.jsx";
import { checkUserAuth } from "../../services/actions/userActions.jsx";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background; 

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
          <Route path="login" element={<OnlyUnAuth component={<Login/>} />} />
          <Route path="profile" element={<OnlyAuth component={<Profile/>} />} >
            <Route path="" element={<ProfileInfo />} />
            <Route path="orders" element={<ProfileInfo />} />
            </Route>
          <Route path="register" element={<OnlyUnAuth component={<Register />}  />} />
          <Route path="forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
      </>
    
  );
}

export default App;
