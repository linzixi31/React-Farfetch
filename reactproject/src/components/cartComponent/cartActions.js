import * as cartConstants from './../cartComponent/cartConstants';

//获取购物车商品
export function getCartProduct(userId){
	return {
		types:[cartConstants.CART_REQUESTING,cartConstants.CART_REQUESTED,cartConstants.CART_REQUESTERROR],
		url:'/getCartProduct',
		data:{userId:userId}
	}
}
//删除购物车商品
export function deleteCartPro(userId,delId){
	return {
		types:[cartConstants.CART_REQUESTING,cartConstants.CART_REQUESTED,cartConstants.CART_REQUESTERROR],
		url:'/deleteCartPro',
		method:'post',
		data:{delId:delId,userId:userId}
	}
}
//添加到心愿单
export function addToWish(userId,wishId){
	return {
		operation:'cartToWish',
		types:[cartConstants.CART_REQUESTING,cartConstants.CART_REQUESTED,cartConstants.CART_REQUESTERROR],
		url:'/addToWish',
		method:'post',
		data:{wishId:wishId,userId:userId}
	}
}
//改变购物车商品加购信息
export function changeCart(userId,res, changeType,changeId){
	return {
		types:[cartConstants.CART_REQUESTING,cartConstants.CART_REQUESTED,cartConstants.CART_REQUESTERROR],
		url:'/changecart',
		method:'post',
		data:{changeId:changeId,userId:userId,changeType:changeType,res:res}
	}
}
