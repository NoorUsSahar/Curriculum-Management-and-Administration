import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from '../actions/types';

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: null,
  token: localStorage.getItem('token'),
  users: [],
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_FAILED:
    case LOGOUT:
    case AUTH_ERROR:
    case REGISTER_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case REGISTER_SUCCESS:
    default:
      return state;
  }
}
