//calendar actions event
import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_EVENT,
  EVENT_ERROR
} from "./types";

export const getCurrentEvents = ()=> async (dispatch) => {
    try {
      const res = await axios.get('/api/calendar/me', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With,content-type",
        },
      });
      dispatch({
        type: GET_EVENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: { msg: err.message, status: err.status },
      });
    }
  };


  //create event
  export const createEvent = (formData, history) => async (
    dispatch
  ) => {
    try {
      const config = {
        headers: {
          Content_Type: "application/json",
        },
      };
  
      const res = await axios.put("/api/calendar", formData, config);
  
      dispatch({
        type: GET_EVENT,
        payload: res.data,
      });
  
      dispatch(setAlert( "Event Created", "success"));
  
      //redirecting an action so using history to redirect component we use <Redirect/> instead
      // if(!edit){
      //   history.push('/dashboard');
      // }
      history.push("/calendar");
    } catch (err) {
      const errors = err.response;
  
      if (errors) {
       
        // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
        dispatch(setAlert(errors.msg, "danger"));
      } else if (err.request) {
        dispatch(setAlert(err.msg, "danger"));
      }
  
      dispatch({
        type: EVENT_ERROR,
        payload: { msg: errors.statusText, status: errors.status },
      });
    }
  };