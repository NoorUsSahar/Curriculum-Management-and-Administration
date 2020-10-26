import {
  ALL_PROGRAMS_LOADED,
  PROGRAM_ERROR,
  PROGRAM_CREATED,
  PROGRAM_LOADED,
  PROGRAM_UPDATED,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all programs
export const getAllPrograms = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/programs');

    dispatch({
      type: ALL_PROGRAMS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create a program
export const createProgram = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/programs', formData, config);

    dispatch({ type: PROGRAM_CREATED });

    dispatch(setAlert('Program created'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert('Error occured while creating PROGRAM'));
  }
};

// Get program by id
export const getProgramById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/programs/${id}`);

    dispatch({
      type: PROGRAM_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update a program
export const updateProgram = (id, formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put(`/api/programs/${id}`, formData, config);

    dispatch({ type: PROGRAM_UPDATED });

    dispatch(setAlert('Program updated'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert('Error occured while updating PROGRAM'));
  }
};
