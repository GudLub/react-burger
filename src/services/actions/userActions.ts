import {
  login,
  logout,
  getUser,
  registerPost,
  currentMail,
  patchUser,
  resetPassword,
} from "../../utils/api";
import { AppDispatch } from "../../hooks";
import { TUser, TRegisterPost, TResetPassword, TLogin, TRegisterResponse, TPatchUserResponse } from "../../utils/types";

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

type TGetUserRequest = {
  type: typeof GET_USER_REQUEST,
}
type TGetUserSuccess = {
  type: typeof GET_USER_SUCCESS,
  success: boolean,
  name: string,
  email: string,
}
type TGetUserFailed = {
  type: typeof GET_USER_FAILED,
}

type TSetAuthChecked = {
  type: typeof SET_AUTH_CHECKED,
  payload: boolean,
}
export const setAuthChecked = (value: boolean): TSetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

type TSetUser = {
  type: typeof SET_USER,
  payload: TUser | null,
}
export const setUser = (user: TUser | null): TSetUser => ({
  type: SET_USER,
  payload: user,
});

export const getUserFetch = () => {
  return (dispatch: AppDispatch) => {
    return getUser()
    .then((res) => {
      dispatch(setUser(res.user));
    })
    .catch ((err) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log(err);
    })
  };
};

type TRegisterRequest = {
  type: typeof REGISTER_REQUEST,
}
const registerRequest = (): TRegisterRequest => ({
  type: REGISTER_REQUEST,
})

type TRegisterSuccess = {
  type: typeof REGISTER_SUCCESS,
  success: boolean,
  email: string,
  name: string,
  accessToken: string,
  refreshToken: string,
}
const registerSuccess = (res: TRegisterResponse): TRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  success: res.success,
  email: res.user.email,
  name: res.user.name,
  accessToken: res.accessToken,
  refreshToken: res.refreshToken,
})

type TRegisterFailed = {
  type: typeof REGISTER_FAILED,
}
const registerFailed = (): TRegisterFailed => ({
  type: REGISTER_FAILED,
})

export const register = (obj: TRegisterPost) => {
  return (dispatch: AppDispatch) => {
    dispatch(registerRequest());
    registerPost(obj)
      .then((res) => {
        if (res && res.success) {
          dispatch(registerSuccess(res));
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUser(res.user)); 
          dispatch(setAuthChecked(true));
        } else {
          dispatch(registerFailed());
        }
      })
      .catch(() => {
        dispatch(registerFailed());
      });
  };
};

type TRestorePasswordRequest = {
  type: typeof RESTORE_PASSWORD_REQUEST,
}
const restorePasswordRequest = (): TRestorePasswordRequest => ({
  type: RESTORE_PASSWORD_REQUEST,
})

type TRestorePasswordSuccess = {
  type: typeof RESTORE_PASSWORD_SUCCESS,
  success: boolean,
}
const restorePasswordSuccess = (success: boolean): TRestorePasswordSuccess => ({
  type: RESTORE_PASSWORD_SUCCESS,
  success,
})

type TRestorePasswordFailed = {
  type: typeof RESTORE_PASSWORD_FAILED,
}
const restorePasswordFailed = (): TRestorePasswordFailed => ({
  type: RESTORE_PASSWORD_FAILED,
})

export const restorePassword = ({email}: {email: string}) => {
  return (dispatch: AppDispatch) => {
    dispatch(restorePasswordRequest());
    currentMail(email)
      .then((res) => {
        localStorage.setItem("email", res["password-reset"]);
        dispatch(restorePasswordSuccess(res.success));
      })
      .catch(() => {
        dispatch(restorePasswordFailed());
      });
  };
};

type TResetPasswordRequest = {
  type: typeof RESET_PASSWORD_REQUEST,
}
const resetPasswordRequest = (): TResetPasswordRequest => ({
  type: RESET_PASSWORD_REQUEST,
})

type TResetPasswordSuccess = {
  type: typeof RESET_PASSWORD_SUCCESS,
  reset: boolean,
}
const resetPasswordSuccess = (reset: boolean): TResetPasswordSuccess => ({
  type: RESET_PASSWORD_SUCCESS,
  reset,
})

type TResetPasswordFailed = {
  type: typeof RESET_PASSWORD_FAILED,
}
const resetPasswordFailed = (): TResetPasswordFailed => ({
  type: RESET_PASSWORD_FAILED,
})

export const resetPasswordFetch = (obj: TResetPassword) => {
  return (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest());
    resetPassword(obj)
      .then((res) => {
        localStorage.removeItem("email");
        dispatch(resetPasswordSuccess(res.success));
      })
      .catch(() => {
        dispatch(resetPasswordFailed());
      });
  };
};

type TPatchUserRequest = {
  type: typeof PATCH_USER_REQUEST,
}
const patchUserRequest = (): TPatchUserRequest => ({
  type: PATCH_USER_REQUEST,
})

type TPatchUserSuccess = {
  type: typeof PATCH_USER_SUCCESS,
  email: string,
  name: string,
  success: boolean,
}
const patchUserSuccess = (res: TPatchUserResponse): TPatchUserSuccess => ({
  type: PATCH_USER_SUCCESS,
  email: res.user.email,
  name: res.user.name,
  success: res.success,
})

type TPatchUserFailed = {
  type: typeof PATCH_USER_FAILED,
}
const patchUserFailed = (): TPatchUserFailed => ({
  type: PATCH_USER_FAILED,
})

export const patchUserFetch = (obj: TUser) => {
  return (dispatch: AppDispatch) => {
    dispatch(patchUserRequest());
    patchUser(obj)
      .then((res) => {
        if (res && res.success) {
          dispatch(patchUserSuccess(res));
          dispatch(setUser(res.user));
        } else {
          dispatch(patchUserFailed());
        }
      })
      .catch(() => {
        dispatch(patchUserFailed());
      });
  };
};

type TLoginRequest = {
  type: typeof LOGIN_REQUEST,
  isAuthChecked: boolean,
}
const loginRequest = (isAuthChecked: boolean): TLoginRequest => ({
  type: LOGIN_REQUEST,
  isAuthChecked
})

type TLoginSuccess = {
  type: typeof LOGIN_SUCCESS,
  success: boolean,
  isAuthChecked: boolean,
  accessToken: string,
  refreshToken: string,
  email: string,
  name: string,
}
const loginSuccess = (res: TRegisterResponse): TLoginSuccess => ({
  type: LOGIN_SUCCESS,
  success: res.success,
  isAuthChecked: res.success,
  accessToken: res.accessToken,
  refreshToken: res.refreshToken,
  email: res.user.email,
  name: res.user.name,
})

type TLoginFailed = {
  type: typeof LOGIN_FAILED,
}
const loginFailed = (): TLoginFailed => ({
  type: LOGIN_FAILED,
})

export const logIn = (obj: TLogin) => {
  return (dispatch: AppDispatch) => {
    dispatch(loginRequest(true));
    login(obj)
      .then((res) => {
        if (res && res.success) {
          dispatch(loginSuccess(res));
          dispatch(setUser(res.user));
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setAuthChecked(true));
        } else {
          dispatch(loginFailed());
        }
      })
      .catch(() => {
        dispatch(loginFailed());
      });
  };
};

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserFetch())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("email");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

type TLogoutRequest = {
  type: typeof LOGOUT_REQUEST,
}
const logoutRequest = (): TLogoutRequest => ({
  type: LOGOUT_REQUEST,
})

type TLogoutSuccess = {
  type: typeof LOGOUT_SUCCESS,
  success: boolean,
  accessToken: string,
  refreshToken: string, 
}
const logoutSuccess = (success: boolean): TLogoutSuccess => ({
  type: LOGOUT_SUCCESS,
  success,
  accessToken: "",
  refreshToken: "",
})

type TLogoutFailed = {
  type: typeof LOGOUT_FAILED,
}
const logoutFailed = (): TLogoutFailed => ({
  type: LOGOUT_FAILED,
})

export const logOut = () => {
  return (dispatch: AppDispatch) => {
    dispatch(logoutRequest());
    logout()
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("email");
          dispatch(logoutSuccess(res.success));
          dispatch(setUser(null));
        } else {
          dispatch(logoutFailed());
        }
      })
      .catch(() => {
        dispatch(logoutFailed());
      });
  };
};

export type TUserActions =
| TSetAuthChecked
| TSetUser
| TRegisterRequest
| TRegisterSuccess
| TRegisterFailed
| TRestorePasswordRequest
| TRestorePasswordSuccess
| TRestorePasswordFailed
| TResetPasswordRequest
| TResetPasswordSuccess
| TResetPasswordFailed
| TPatchUserRequest
| TPatchUserSuccess
| TPatchUserFailed
| TLoginRequest
| TLoginSuccess
| TLoginFailed
| TLogoutRequest
| TLogoutSuccess
| TLogoutFailed
| TGetUserRequest
| TGetUserSuccess
| TGetUserFailed;