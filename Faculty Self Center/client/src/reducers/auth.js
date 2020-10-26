import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR , 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT  ,
  ACCOUNT_DELETED
} from '../actions/types';


const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading : true,
  faculty : null
}

export default function(state = initialState, action){
  const{type , payload} = action;

  switch (type){
      case USER_LOADED:
          return{
              ...state,
              isAuthenticated : true ,
              loading : false,
              faculty : payload
          }
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
          localStorage.setItem('token' , payload.token);
          return {
              ...state, 
              ...payload,
              isAuthenticated :true,
              loading :false
          }
      case ACCOUNT_DELETED:
      case LOGOUT:
      case LOGIN_FAIL:
      case REGISTER_FAIL:
      case AUTH_ERROR:
          localStorage.removeItem('token');
          return{
              ...state , 
              token : null , 
              isAuthenticated :false,
              loading :false,
              error : payload
          }

      default:
          return state;
  }

}