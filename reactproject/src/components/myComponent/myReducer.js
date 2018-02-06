import * as ajaxConstants from '../../constants/ajaxConstants'

import * as myAjax from './myConstants.js'
export default function(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case ajaxConstants.AJAX_REQUESTING:
            newState.status = 0;
            break;
        case ajaxConstants.AJAX_REQUESTED:
            newState.status = 1;
            newState.result = action.result;
            break;
        case ajaxConstants.AJAX_REQUESTERROR:
            newState.status = -1;
            break;
    }
    return newState;
}