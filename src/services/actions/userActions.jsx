import {
  login,
  logout,
  getUser,
  registerPost,
  currentMail,
  patchUser,
  resetPassword,
} from "../../utils/api.jsx";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const RESTORE_PASSWORD_REQUEST = "RESTORE_PASSWORD_REQUEST";
export const RESTORE_PASSWORD_SUCCESS = "RESTORE_PASSWORD_SUCCESS";
export const RESTORE_PASSWORD_FAILED = "RESTORE_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUserFetch = () => {
  return (dispatch) => {
    return getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const register = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerPost(name, email, password)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: REGISTER_SUCCESS,
            success: res.success,
            email: res.user.email,
            name: res.user.name,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          dispatch(setUser(res.user)); 
        } else {
          dispatch({
            type: REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILED,
          error: err.message,
        });
      });
  };
};

export const restorePassword = ({email}) => {
  return (dispatch) => {
    dispatch({
      type: RESTORE_PASSWORD_REQUEST,
    });
    currentMail(email)
      .then((res) => {
        dispatch({
          type: RESTORE_PASSWORD_SUCCESS,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESTORE_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
};

export const resetPasswordFetch = ({password, token}) => {
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPassword(password, token)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          reset: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
};

export const patchUserFetch = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    patchUser(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: PATCH_USER_SUCCESS,
            email: res.user.email,
            name: res.user.name,
            success: res.success,
          });
          dispatch(setUser(res.user));
        } else {
          dispatch({
            type: PATCH_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
          error: err.message,
        });
        console.log(`Ошибка: ${err}`);
      });
  };
};

export const logIn = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    login(email, password)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            isAuthChecked: res.success,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            email: res.user.email,
            name: res.user.name,
          });
          dispatch(setUser(res.user));
          dispatch(setAuthChecked(true));
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          error: err.message,
        });
      });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserFetch())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logout()
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: LOGOUT_SUCCESS,
            accessToken: "",
            refreshToken: "",
          });
          dispatch(setUser(null));
        } else {
          dispatch({
            type: LOGOUT_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
          error: err.message,
        });
      });
  };
};
