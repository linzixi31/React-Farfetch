import {CASH_REQUESTING, CASH_REQUESTED, CASH_REQUESTERROR} from './cashconstants';

//获取订单
export function getOrders(_orderIds,_userId){
	return {
		types:[CASH_REQUESTING, CASH_REQUESTED, CASH_REQUESTERROR],
		url:'/getorders',
		method:'post',
		data:{userId:_userId,orderIds:_orderIds}
	}
}

//付款
export function payOrder(_orderIds) {
	return {
		types:[CASH_REQUESTING, CASH_REQUESTED, CASH_REQUESTERROR],
		url:'/payorders',
		method:'post',
		data:{orderIds:_orderIds}
	}
}