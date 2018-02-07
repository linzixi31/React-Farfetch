import {CASH_REQUESTING, CASH_REQUESTED, CASH_REQUESTERROR} from './cashconstants';

export default function pay(state = {}, action){
	let newState = JSON.parse(JSON.stringify(state));
	switch(action.type){
		case CASH_REQUESTING:
			newState.status = 0;
			break;
		case CASH_REQUESTED:
			newState.status = 1;
			newState.result = action.result;
			break;
		case CASH_REQUESTERROR:
			newState.status = -1;
			newState.result = action.result;
			break;
	}
	return newState;
}