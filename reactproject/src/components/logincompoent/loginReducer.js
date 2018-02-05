import {ADD,REMOVE,SPINNER,CLOSESPINNER} from './loginConstants.js';
import * as ajaxConstants from '../../constants/ajaxConstants'

export default function login(state={ count:0,loading:false},action){
    var newstate = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case ADD : 
          newstate.count++;
        break;
        case REMOVE :
           newstate.count--;
        break;
        case SPINNER :
            newstate.loading= true;
        break;
        case CLOSESPINNER:
            newstate.loading= false;
        break
        case ajaxConstants.AJAX_REQUESTING:
            newstate.status = 0;
            break;
        case ajaxConstants.AJAX_REQUESTED:
            newstate.status = 1;
            newstate.token=action.token;
            let a = (action.result ? action.result.results : {results:{insertId:''}});
            newstate.result = a;
            break;
        case ajaxConstants.AJAX_REQUESTERROR:
            newstate.status = -1;
            newstate.result = action.result.data;
            break;
      

    }
    // console.log(state,action)

    return newstate;
}


