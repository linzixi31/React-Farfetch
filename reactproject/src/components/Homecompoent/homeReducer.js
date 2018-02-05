import * as homeConstants from "./homeConstants.js";

export default function getHot(state = {},action){
	let newState = JSON.parse(JSON.stringify(state));
	switch(action.type){
		case  homeConstants.GETHOT_REQUESTING:
			newState.status = 0;
			break;
		case  homeConstants.GETHOT_REQUESTED:
			newState.status = 1;
			newState.result = action.result.results;
			break;
		case homeConstants.GETHOT_REQUESTERROR:
			newState.status = -1;
			newState.result = action.result;
			break;
		case  homeConstants.GETOFF_REQUESTING:
			newState.status = 0;
			newState.offresult = action.result;
			break;
		case  homeConstants.GETOFF_REQUESTED:
			newState.status = 1;
			newState.offresult = action.result.results;
			break;
		case homeConstants.GETOFF_REQUESTERROR:
			newState.status = -1;
			break;	
		case homeConstants.GETYSL_REQUESTING:
			newState.status = 0;
			break;
		case homeConstants.GETYSL_REQUESTED:
			newState.status = 1;
			newState.yslresult = action.result.results;
			break;
		case homeConstants.GETYSL_REQUESTERROR:
			newState.status = -1;
			break;
		case homeConstants.GETGUCCI_REQUESTING:
			newState.status = 0;
			break;
		case homeConstants.GETGUCCI_REQUESTED:
			newState.status = 1;
			newState.gucciresult = action.result.results;
			break;
		case homeConstants.GETGUCCI_REQUESTERROR:
			newState.status = -1;
			break;
	}
	return newState;
}

