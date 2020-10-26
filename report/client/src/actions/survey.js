import axios from "axios";
import { setAlert } from "./alert";

import {
  SURVEY_GET_FAILURE,
  SURVEY_GET_SUCCESS,
  GET_SURVEYS_SUCCESS,
  SURVEY_RESPONSE_SUCCESS,
  SURVEY_RESPONSE_FAIL,
  GET_SURVEY_RESP_FAIL,
  GET_SURVEY_RESP_SUCCESS
} from "./types";

//get All Survey Forms
export const getAllSurveyForms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/survey/surveys", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      },
    });
    dispatch({
      type: GET_SURVEYS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SURVEY_GET_FAILURE,
      payload: { msg: err.message, status: err.status },
    });
  }
};

// Get survey by id
export const getSurveyById = (survey_form_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/survey/${survey_form_id}`);
    dispatch({
      type: SURVEY_GET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SURVEY_GET_FAILURE,
      payload: { msg: err.message, status: err.status },
    });
  }
};



//Set Dates to surveys
export const setSurveyDates = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.put(
      "/api/survey/set-date",
      formData,
      config
    );

    dispatch(setAlert("Date Set Successfully", "success"));

    // history.push("/dashboard");
  } catch (err) {
    const errors = err.response;
    dispatch(setAlert("Date Not Set", "danger"));
    
  }
};

//Add Responses to surveys
export const addSurveyResponse = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.post(
      "/api/survey/survey_response",
      formData,
      config
    );

    dispatch({
      type: SURVEY_RESPONSE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Response Saved Successfully", "success"));

    // history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    dispatch({
      type: SURVEY_RESPONSE_FAIL,
      payload: { msg: errors.statusText, status: errors.status },
    });
  }
};


//get survey_responses by title
export const getResponseByTitles = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };
    const res = await axios.post(
      "/api/survey/responses",
      formData,
      config
    );
    dispatch({
      type: GET_SURVEY_RESP_SUCCESS,
      payload: res.data,
    });

    // dispatch(setAlert("Response Saved Successfully", "success"));
    // history.push("/dashboard");

  } catch (err) {
    const errors = err.response;
    dispatch({
      type: GET_SURVEY_RESP_FAIL,
      payload: { msg: err.message, status: err.status },
    });
  }
};

// Get survey_response by survey_id
export const getResponseBySurveyId = (survey_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/survey/responses/${survey_id}`);

    dispatch({
      type: GET_SURVEY_RESP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SURVEY_RESP_FAIL,
      payload: { msg: err.message, status: err.status },
    });
  }
};