// import { combineReducers } from 'redux';
// import auth from './auth';
// import alert from './alert';
// import department from './department';
// import program from './program';
// import applicant from './applicant';

// export default combineReducers({
//   auth,
//   alert,
//   department,
//   program,
//   applicant,
// });

//Root Reducer
import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import event from './event';
import survey from './survey';

//takes all the reducers
export default combineReducers({
    alert,
    auth,
    profile,
    event, 
    survey
});