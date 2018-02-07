import {PAY_REQUESTING, PAY_REQUESTED, PAY_REQUESTERROR} from './payConstants';

export default function pay(state = {}, action){
	let newState = JSON.parse(JSON.stringify(state));
	switch(action.type){
		case PAY_REQUESTING:
			newState.status = 0;
			break;
		case PAY_REQUESTED:
			newState.status = 1;
			newState.result = action.result;
			break;
		case PAY_REQUESTERROR:
			newState.status = -1;
			newState.result = action.result;
			break;
	}
	return newState;
}