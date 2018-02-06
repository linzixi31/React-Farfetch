import * as cartConstants from './../cartComponent/cartConstants';

//获取购物车商品
export function getCartProduct(){
	return {
		types:[cartConstants.CART_REQUESTING,cartConstants.CART_REQUESTED,cartConstants.CART_REQUESTERROR],
		url:'/getCartProduct',
		data:{userId:1}
	}
}
//删除购物车商品
export function deleteCartPro(delId){
	return {
		types:[cartConstants.CART_REQUESTING,cartConstants.CART_REQUESTED,cartConstants.CART_REQUESTERROR],
		url:'/deleteCartPro',
		method:'post',
		data:{delId:delId,userId:1}
	}
}
//添加到心愿单
export function addToWish(wishId){
	return {
		operation:'cartToWish',
		types:[cartConstants.CART_REQUESTING,cartConstants.CART_REQUESTED,cartConstants.CART_REQUESTERROR],
		url:'/addToWish',
		method:'post',
		data:{wishId:wishId,userId:1}
	}
}
//改变购物车商品加购信息
export function changeCart(res, changeType,changeId){
	return {
		types:[cartConstants.CART_REQUESTING,cartConstants.CART_REQUESTED,cartConstants.CART_REQUESTERROR],
		url:'/changecart',
		method:'post',
		data:{changeId:changeId,userId:1,changeType:changeType,res:res}
	}
}
