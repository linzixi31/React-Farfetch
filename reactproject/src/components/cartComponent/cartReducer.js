import * as cartConstants from './cartConstants';

export default function cart(state = {cartList:[]}, action){
	let newState = JSON.parse(JSON.stringify(state));
	if(!action.operation){
		switch(action.type){
			case cartConstants.CART_REQUESTING :
			newState.status = 0;
			break;
			case cartConstants.CART_REQUESTED :
			newState.cartList = action.result;
			newState.status = 1;
			break;
			case cartConstants.CART_REQUESTERROR :

			newState.cartList = action.result;
			newState.status = -1;
			break;
		}
	}else{
		switch(action.type){
			case cartConstants.CART_REQUESTING :
			newState.status = 0;
			break;
			case cartConstants.CART_REQUESTED :
			newState.operaResult = action.result;
			newState.status = 1;
			break;
			case cartConstants.CART_REQUESTERROR :
			
			newState.operaResult = action.result;
			newState.status = -1;
			break;
		}
	}
	
	return newState;
}