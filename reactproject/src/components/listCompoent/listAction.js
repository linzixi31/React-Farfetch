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
    //console.log(value)
    switch(Number(value)){
        case 0:
          return{
            types:[listConstants.List_REQUESTING,listConstants.List_REQUESTED,listConstants.List_REQUESTERROR],
            url:'/choseshop',
            data:params,
            method:'post'
          }
          break;
        case 1:
            console.log(666)
          params.newest = 1
          return{
            types:[listConstants.List_REQUESTING,listConstants.List_REQUESTED,listConstants.List_REQUESTERROR],
            url:'/newest',
            data:params,
            method:'post'
          }
        break;
        case 2:
            console.log(666)
          params.newest = 1
          return{
            types:[listConstants.List_REQUESTING,listConstants.List_REQUESTED,listConstants.List_REQUESTERROR],
            url:'/orderL',
            data:params,
            method:'post'
          }
        break;
        case 3:
            console.log(666)
          params.newest = 1
          return{
            types:[listConstants.List_REQUESTING,listConstants.List_REQUESTED,listConstants.List_REQUESTERROR],
            url:'/orderT',
            data:params,
            method:'post'
          }
        break;
          
        }
    
}
export function getstarData(){
    return{
        types:[listConstants.STAR_REQUESTING,listConstants.STAR_REQUESTED,listConstants.STAR_REQUESTERROR],
        url:"/star",
        data:params,
        method:'post'
    }
}