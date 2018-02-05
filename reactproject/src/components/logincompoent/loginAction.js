
import {ADD,REMOVE,SPINNER,CLOSESPINNER} from './loginConstants.js';

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

export function loginTest(params){
    return{
        url:'/login',
        method:'post',
        data:params
    }
}
export function registerTest(params){
    return{
        url:'/register',
        method:'post',
        data:params
    }
}

