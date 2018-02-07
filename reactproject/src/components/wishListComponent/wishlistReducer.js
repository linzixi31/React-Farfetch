import * as wishConstants from "./wishConstants";

export default function checkList(state = {},action){
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case wishConstants.WISHLIST_REQUESTING:
            newState.status = 0;
            break;
        case wishConstants.WISHLIST_REQUESTED:
            newState.status = 1;
            newState.result = action.result.results;
            break;
        case wishConstants.WISHLIST_REQUESTERROR:
            newState.status = -1;
            break;
        case wishConstants.DELFROMWISH_REQUESTING:
            newState.status = 0;
            break;
        case wishConstants.DELFROMWISH_REQUESTED:
            newState.status = 1;
            newState.delResult = action.result;
            break;  
        case wishConstants.DELFROMWISH_REQUESTERROR:
            newState.status = -1;
            break;
    }
    return newState;
}