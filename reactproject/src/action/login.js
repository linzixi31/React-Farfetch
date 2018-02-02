
import {ADD,REMOVE,SPINNER,CLOSESPINNER} from '../constants/login.js';

export function add(){
    return {
        type : ADD
    }
}

export function remove(){
    return {
        type:REMOVE
    }
}

export function spinner(){
    return{
        type:SPINNER
    }
}
export function closespinner(){
    return{
        type:CLOSESPINNER
    }
}
export function loginajax(params){
    return{
        url:'/login',
        method:'post',
        data:params
    }
}

