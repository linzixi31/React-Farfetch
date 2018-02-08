export function getOrderInformation(params){
    return{
        url:'/getorders',
        method:'post',
        data:params,
    }
}

export function changeOrderType(params){
	return {
		url:'/payorders',
        method:'post',
        data:params,
	}
}