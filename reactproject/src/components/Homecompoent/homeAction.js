import * as ajaxConstants from "../../constants/ajaxConstants";
import * as homeConstants from "./homeConstants";

export function getHot(){
	return {
		types:[homeConstants.GETHOT_REQUESTING,
		homeConstants.GETHOT_REQUESTED,homeConstants.GETHOT_REQUESTERROR],
		method:"get",
		url:"/hotGoods",
		params:{}
	}
}

export function getOff(){
	return{
		types:[homeConstants.GETOFF_REQUESTING,homeConstants.GETOFF_REQUESTED,
		homeConstants.GETOFF_REQUESTERROR],
		method:"get",
		url:"/getOff",
		params:{}
	}
}

export function getYsl(){
	return{
		types:[homeConstants.GETYSL_REQUESTING,homeConstants.GETYSL_REQUESTED,
		homeConstants.GETYSL_REQUESTERROR],
		method:"get",
		url:"/getYsl",
		params:{}
	}
}

export function getGucci(){
	return{
		types:[homeConstants.GETGUCCI_REQUESTING,homeConstants.GETGUCCI_REQUESTED,
		homeConstants.GETGUCCI_REQUESTERROR],
		method:"get",
		url:"/getGucci",
		params:{}
	}
}
