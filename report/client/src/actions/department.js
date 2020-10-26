import {
  ALL_DEPARTMENTS_LOADED,
  DEPARTMENT_ERROR,
  DEPARTMENT_CREATED,
  DEPARTMENT_LOADED,
  DEPARTMENT_UPDATED,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all departments
export const getAllDepartments = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/departments');

    dispatch({
      type: ALL_DEPARTMENTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create a department
export const createDepartment = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/departments', formData, config);

    dispatch({ type: DEPARTMENT_CREATED });

    dispatch(setAlert('Department created'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert('Error occured while creating department'));
  }
};

// Get department by id
export const getDepartmentById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/departments/${id}`);

    dispatch({
      type: DEPARTMENT_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update a department
export const updateDepartment = (id, formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put(`/api/departments/${id}`, formData, config);

    dispatch({ type: DEPARTMENT_UPDATED });

    dispatch(setAlert('Department updated'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert('Error occured while updating department'));
  }
};
