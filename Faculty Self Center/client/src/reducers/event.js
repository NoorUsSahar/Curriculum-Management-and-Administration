//calendar event reducer
import {GET_EVENT , EVENT_ERROR} from '../actions/types';
const initialState = {

    event : null
}
export default function(state = initialState , action){
    const {type , payload} = action;

    switch(type){
        case GET_EVENT:
            return {
                ...state ,
                event : payload
            }
        
        case EVENT_ERROR:
            return {
                ...state ,
                error : payload
            }
        
        default:
            return state;
    }
}