import {
  ALL_PROGRAMS_LOADED,
  PROGRAM_ERROR,
  PROGRAM_CREATED,
  PROGRAM_LOADED,
  PROGRAM_UPDATED,
} from '../actions/types';

const initialState = {
  program: null,
  programs: [],
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_PROGRAMS_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        programs: payload,
      };
    case PROGRAM_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        program: payload,
      };
    case PROGRAM_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case PROGRAM_CREATED:
    case PROGRAM_UPDATED:
    default:
      return state;
  }
}
