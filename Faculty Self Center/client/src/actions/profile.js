import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_CURRENT_PROFILE
} from "./types";

//get current faculty's profile

export const getCurrentFaculty = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      },
    });
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//get All profiles
export const getFaculties = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      },
    });
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//get Profile by id
export const getFacultyById = facultyId => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/faculty/${facultyId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//Create or update a profile
//history will push to client side route
//TODDO : create update profile separate (take out edit parameter)
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    //redirecting an action so using history to redirect component we use <Redirect/> instead
    // if(!edit){
    //   history.push('/dashboard');
    // }
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    if (errors) {
      const err = errors.data.errors;
      // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
      dispatch(setAlert("Invalid Credentials", "danger"));
    } else if (err.request) {
      dispatch(setAlert("err.msg", "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Reasearch Papers
export const addResearchPapers = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.put(
      "/api/profile/research_papers",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Research Paper Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    //  if(errors){
    //      const err = errors.data.errors;
    //    // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
    //     dispatch(setAlert(err.msg , 'danger'));
    //  }
    //  else if(err.request){

    //      dispatch(setAlert(err.msg , 'danger'));
    //  }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: errors.statusText, status: errors.status },
    });
  }
};

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    if (errors) {
      const err = errors.data.errors;
      // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
      dispatch(setAlert(err.msg, "danger"));
    } else if (err.request) {
      dispatch(setAlert(err.msg, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    if (errors) {
      const err = errors.data.errors;
      // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
      dispatch(setAlert(err.msg, "danger"));
    } else if (err.request) {
      dispatch(setAlert(err.msg, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete research_paper
export const deleteResearchPaper = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/research_paper/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Research Paper Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
//Delete Account and Profile
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm("Are you sure")) {
    try {
      await axios.delete(1`/api/profile/`);

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.message, status: err.status },
      });
    }
  }
};
