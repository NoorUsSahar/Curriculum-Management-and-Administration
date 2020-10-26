import {
  ALL_COORDINATORS_LOADED,
  COORDINATOR_LOADED,
  COORDINATOR_REGISTER_SUCCESS,
  COORDINATOR_REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  COORDINATOR_NAME_UPDATED,
  COORDINATOR_PASSWORD_UPDATED,
  COORDINATOR_PROFILE_PICTURE_UPDATED,
  COORDINATOR_PROFILE_PICTURE_REMOVED,
  COORDINATORS_ERROR,
  AUTH_ERROR,
  SET_AUTH_COORDINATOR_LOADING,
  UNSET_AUTH_COORDINATOR_LOADING
} from '../actions/types';

const initialState = {
  coordinator: null,
  loading: true,
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  coordinators: [],
  coordinatorLoading: true,
  errors: null
};

export default function(state = initialState, action) {
  const [type, payload] = action;

  switch (type) {
    case ALL_COORDINATORS_LOADED:
      return {
        ...state,
        error: null,
        coordinators: payload
      };
    case COORDINATOR_LOADED:
    case COORDINATOR_NAME_UPDATED:
    case COORDINATOR_PROFILE_PICTURE_UPDATED:
    case COORDINATOR_PROFILE_PICTURE_REMOVED:
      return {
        ...state,
        coordinator: payload,
        loading: false,
        isAuthenticated: true,
        coordinatorLoading: true
      };
    case SET_AUTH_COORDINATOR_LOADING:
      return {
        ...state,
        coordinatorLoading: true
      };
    case UNSET_AUTH_COORDINATOR_LOADING:
      return {
        ...state,
        coordinatorLoading: false
      };
    case COORDINATORS_ERROR:
      return {
        ...state,
        errors: payload,
        coordinators: []
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token');
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        coodinatorLoading: false,
        token: payload
      };
    case AUTH_ERROR:
    case COORDINATOR_REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        coordinator: null,
        loading: false,
        isAuthenticated: false,
        coordinatorLoading: false,
        token: null
      };
    case COORDINATOR_REGISTER_SUCCESS:
    case COORDINATOR_PASSWORD_UPDATED:
    default:
      return state;
  }
}
