import {PAY_REQUESTING, PAY_REQUESTED, PAY_REQUESTERROR} from './payConstants';

export function addAddress(_userId,_data){
	console.log(_data)
	return {
		types:[PAY_REQUESTING, PAY_REQUESTED, PAY_REQUESTERROR],
		url:'/addaddress',
		method:'post',
		data:{userId:_userId,addr:_data}
	}
}

export function getOrders(_orderIds,_userId){
	return {
		types:[PAY_REQUESTING, PAY_REQUESTED, PAY_REQUESTERROR],
		url:'/getorders',
		method:'post',
		data:{userId:_userId,orderIds:_orderIds}
	}
}

export function getAddresses(_userId,_def){
	return {
		types:[PAY_REQUESTING, PAY_REQUESTED, PAY_REQUESTERROR],
		url:'/getaddresses',
		data:{userId:_userId,defaultAddr:_def}
	}
}

//生成订单写入数据库
export function createOrder(_orders,_cartIds,_addrId,_userId){
	return {
		operation:'createOrder',
		types:[PAY_REQUESTING, PAY_REQUESTED, PAY_REQUESTERROR],
		url:'/createorder',
		method:'post',
		data:{orderCates:_orders,userId:_userId,cartIds:_cartIds,addrId:_addrId}
	}
}
//改变当前用户的默认地址
export function changeDefault(_changeId){
	return {
		types:[PAY_REQUESTING, PAY_REQUESTED, PAY_REQUESTERROR],
		url:'/changedefaultaddr',
		method:'post',
		data:{changeId:_changeId,userId:1}
	}
}
//付款
export function payOrder(_orderIds) {
	return {
		url:'/payorders',
		method:'post',
		data:{orderIds:_orderIds}
	}
}