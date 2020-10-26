import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import department from './department';
import program from './program';
import applicant from './applicant';
import survey from './survey';


export default combineReducers({
  auth,
  alert,
  department,
  program,
  applicant,
  survey,
});
