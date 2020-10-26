import { SET_ALERT, REMOVE_ALERT } from './types';

// Set alert
export const setAlert = (message) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: message,
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT,
    payload : message });
  }, 30000);
};
