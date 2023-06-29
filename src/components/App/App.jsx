import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burgerIngredientsActions.jsx";
import { Routes, Route } from 'react-router-dom';
import Home from "../../pages/Home.jsx";
import HeaderLayout from "../HeaderLayout/HeaderLayout.jsx";
import Login from "../../pages/Login.jsx";
import Register from "../../pages/Register.jsx";
import ForgotPassword from "../../pages/ForgotPassword.jsx";
import ResetPassword from "../../pages/ResetPassword.jsx";
import NotFound from "../../pages/NotFound.jsx"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return ( 
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
      
    
  );
}

export default App;
