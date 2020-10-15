import {
  LOGIN_STARTED,
  LOGIN_FAILED,
  LOGGED_IN,
  SET_DEVICE_INFO,
  LOGOUT,
  GET_MY_USER,
  GET_MY_USER_SUCCESS,
  GET_MY_USER_FAILURE,
  EDIT_MY_USER,
  EDIT_MY_USER_SUCCESS,
  EDIT_MY_USER_FAILURE, VERIFY_EMAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE, REAUTHENTICATE_SUCCESS,
} from '../actions/types';
import {act} from "react-test-renderer";

const INITIAL_STATE = {
  user: null,
  loading: false,
  deviceInfo: {
    pushToken: null,
    userId: null,
  },
  myUser: {},
  isEditingUser: false,
  editUserSuccess: false,
  error: null,
};

export default (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {...state, loading: true};
    case LOGIN_FAILED:
      return {...state, loading: false};
    case LOGGED_IN:
      return {...state, loading: false, user: action.user};
    case LOGOUT:
      return {...state, loading: false, user: null};

    case REAUTHENTICATE_SUCCESS: {
      // TODO: change this logic later, when the '/me/' endpoint is implemented
      return {
        ...state,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            ...action.user,
          },
        },
      };
    }

    case GET_MY_USER:
      return {...state, loading: true, myUser: null, editUserSuccess: false};
    case GET_MY_USER_SUCCESS:
      return {...state, loading: false, myUser: action.myUser};
    case GET_MY_USER_FAILURE:
      return {...state, loading: false, error: action.error};

    case EDIT_MY_USER:
      return {
        ...state,
        isEditingUser: true,
        editUserSuccess: false,
        error: null,
      };
    case EDIT_MY_USER_SUCCESS:
      return {...state, isEditingUser: false, editUserSuccess: true};
    case EDIT_MY_USER_FAILURE:
      return {...state, isEditingUser: false, error: action.error};

    case VERIFY_EMAIL:
      return {...state, isVerifyingEmail: true, verifyEmailSuccess: false};
    case VERIFY_EMAIL_SUCCESS:
      return {...state, isVerifyingEmail: false, verifyEmailSuccess: true};
    case VERIFY_EMAIL_FAILURE:
      return {...state, isVerifyingEmail: false, error: action.error};

    case SET_DEVICE_INFO:
      return {...state, loading: false, deviceInfo: action.data};

    default:
      return state;
  }
};
