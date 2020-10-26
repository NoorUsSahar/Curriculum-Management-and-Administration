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
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load All Coordinators
export const loadAllCoordinators = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/coordinators');

    dispatch({
      type: ALL_COORDINATORS_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COORDINATORS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Load Current Coordinator
export const loadCoordinator = () => async dispatch => {
  if (loaclStorage.getItem('token')) {
    setAuthToken(loaclStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/api/users/coordinator');

    dispatch({
      type: COORDINATOR_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register Coordinator
export const registerCoordinator = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put('/api/users/coordinator', formData, config);

    dispatch({
      type: COORDINATOR_REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('Coordinator Successfully Registered'));

    // history.push('/login');

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: COORDINATOR_REGISTER_FAILED
    });
  }
};

// Login Coordinator
export const loginCoordinator = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/auth/login', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadCoordinator());
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => disaptch(setAlert(error.message, 'danger')));
    }
  }
};

// Logout Coordinator
export const logoutCoordinator = () => async dispatch => {
  dispatch({
    type: LOGOUT
  });
};

// Change Coordinator Name
export const changeCoordinatorName = formData => async dispatch => {
  dispatch({
    type: SET_AUTH_COORDINATOR_LOADING
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/users/name', formData, config);

    dispatch({
      type: COORDINATOR_NAME_UPDATED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    dispatch(setAlert('Name has been updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(err.message, 'danger')));
    }
  }
};

// Change Coordinator Password
export const changeCoordinatorPassword = password => async dispatch => {
  dispatch({
    type: SET_AUTH_COORDINATOR_LOADING
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const pass = JSON.stringify({ password });

    const res = await axios.put('/api/user/password', pass, config);

    dispatch({
      type: COORDINATOR_PASSWORD_UPDATED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    dispatch(setAlert('Password updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }
  }
};

// Upload Coordinator Profile Picture
export const uploadCoordinatorProfilePicture = formData => async dispatch => {
  dispatch({
    type: SET_AUTH_COORDINATOR_LOADING
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      '/api/users/profile-picture/upload',
      formData,
      config
    );

    dispatch({
      type: COORDINATOR_PROFILE_PICTURE_UPDATED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    dispatch(setAlert('Profile updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(error.message, 'danger'));
    }
  }
};

// Remove Coordinator Profile Picture
export const removeCoordinatorProfilePicture = formData => async dispatch => {
  dispatch({
    type: SET_AUTH_COORDINATOR_LOADING
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      '/api/users/profile-picture/remove',
      formData,
      config
    );

    dispatch({
      type: COORDINATOR_PROFILE_PICTURE_REMOVED,
      payload: res.data
    });

    disaptch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    dispatch(setAlert('Profile picture removed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });
  }

  const errors = err.response.data.errors;

  if (errors) {
    errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
  }
};
