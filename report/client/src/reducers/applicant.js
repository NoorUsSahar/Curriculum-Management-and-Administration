import {
  APPLICANT_LOADED,
  APPLICANT_ERROR,
  APPLICANT_PERSONAL_DETAILS_UPDATED,
  APPLICANT_INCOME_DETAILS_UPDATED,
} from '../actions/types';

const initialState = {
  applicant: null,
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case APPLICANT_LOADED:
    case APPLICANT_PERSONAL_DETAILS_UPDATED:
    case APPLICANT_INCOME_DETAILS_UPDATED:
      return {
        ...state,
        loading: false,
        errors: null,
        applicant: payload,
      };
    case APPLICANT_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
