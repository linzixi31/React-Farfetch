import * as listConstants from './listConstants.js'
export function getDataList(params){
    return{
        types:[listConstants.List_REQUESTING,listConstants.List_REQUESTED,listConstants.List_REQUESTERROR],
        url:'/list',
        method:'post',
        data:params
    }
}
export function getDataBrand(params){
    return{
        types:[listConstants.ListBRAND_REQUESTING,listConstants.ListBRAND_REQUESTED,listConstants.ListBRAND_REQUESTERROR],
        url:"/listBrand",
        method:'post',
        data:params
    }
}