import * as searchConstants from './searchConstants.js'
export function getSearchData(params){
    return{
        types:[searchConstants.SEARCH_REQUESTING,searchConstants.SEARCH_REQUESTED,searchConstants.SEARCH_REQUESTERROR],
        url:'/search',
        data:params,
        method:'post'
    }
}