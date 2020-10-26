import {
  ALL_DEPARTMENTS_LOADED,
  DEPARTMENT_ERROR,
  DEPARTMENT_CREATED,
  DEPARTMENT_LOADED,
  DEPARTMENT_UPDATED,
} from '../actions/types';

const initialState = {
  department: null,
  departments: [],
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_DEPARTMENTS_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        departments: payload,
      };
    case DEPARTMENT_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        department: payload,
      };
    case DEPARTMENT_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case DEPARTMENT_CREATED:
    case DEPARTMENT_UPDATED:
    default:
      return state;
  }
}
