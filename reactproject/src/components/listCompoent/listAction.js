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
export function getchoseData(params,value){
    // let url = null
    // console.log(value)
    // switch(value)
    //     {
    //     case 0:
    //       url='/choseshop'
    //       break;
    //     case 1:
    //       url='/newest'
    //       break;
    //     case 2:
    //       url='/orderL'
    //       break;
    //     case 3:
    //       url='/orderT'
    //       break;
          
    //     }
    return{
        types:[listConstants.List_REQUESTING,listConstants.List_REQUESTED,listConstants.List_REQUESTERROR],
        url:'/choseshop',
        data:params,
        method:'post'
    }
}