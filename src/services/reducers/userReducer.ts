import {
  SET_AUTH_CHECKED,
  SET_USER,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  TUserActions
} from "../actions/userActions";

const initialState = {
  isAuthChecked: false,
  loading: false,
  success: false,
  email: "",
  name: "",
  accessToken: "",
  refreshToken: "",
  error: "",
  failed: false,
  reset: false,
};

export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.success,
        email: action.email,
        name: action.name,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isAuthChecked: true,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        isAuthChecked: false,
      };
      case RESTORE_PASSWORD_REQUEST: {
        return {
          ...state,
          loading: true
        };
      }
      case RESTORE_PASSWORD_SUCCESS: {
        return {
          ...state,
          loading: false,
          success: action.success,
        };
      }
      case RESTORE_PASSWORD_FAILED: {
        return {
          ...state,
          loading: false,
          failed: true
        };
      }
      case RESET_PASSWORD_REQUEST: {
        return {
          ...state,
          loading: true,
        };
      }
      case RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          loading: false,
          reset: action.reset
        };
      }
      case RESET_PASSWORD_FAILED: {
        return {
          ...state,
          loading: false,
          failed: true
        };
      }
      case PATCH_USER_REQUEST: {
        return {
          ...state,
          loading: true
        }
      }
      case PATCH_USER_SUCCESS: {
        return {
          ...state,
          loading: false,
          email: action.email,
          name: action.name,
          success: action.success,
          isAuthChecked: true,
        }
      }
      case PATCH_USER_FAILED: {
        return {
          ...state,
          failed: true,
          loading: false
        }
      }
      case LOGIN_REQUEST: {
        return {
          ...state,
          loading: true,
          isAuthChecked: action.isAuthChecked
        };
      }
      case LOGIN_SUCCESS: {
        return {
          ...state,
          loading: false,
          success: action.success,
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
          email: action.email,
          name: action.name,
          isAuthChecked: true
        };
      }
      case LOGIN_FAILED: {
        return {
          ...state,
          loading: false,
          failed: true,
        };
      }
      case LOGOUT_REQUEST: {
        return {
          ...state,
          loading: true
        }
      }
      case LOGOUT_SUCCESS: {
        return {
          ...state,
          loading: false,
          success: action.success,
          isAuthChecked: false
        }
      }
      case LOGOUT_FAILED: {
        return {
          ...state,
          failed: true,
          loading: false
        }
      }
      case GET_USER_REQUEST: {
        return {
          ...state,
          loading: true,
        };
      }
      case GET_USER_SUCCESS: {
        return {
          ...state,
          success: action.success,
          email: action.email,
          name: action.name,
          isAuthChecked: true
        }
      }
      case GET_USER_FAILED: {
        return {
          ...state,
          failed: true,
          loading: false
        }
      } 
    default:
      return state;
  }
}