import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = '';

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      state = payload;
      return state;
    case REMOVE_ALERT:
      state = '';
      return state;
    default:
      return state;
  }
}
