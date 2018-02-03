import * as listConstants from './listConstants.js'
export function getDataList(params){
    return{
        types:[listConstants.List_REQUESTING,listConstants.List_REQUESTED,listConstants.List_REQUESTERROR],
        url:'/list',
        method:'post',
        data:params
    }
}