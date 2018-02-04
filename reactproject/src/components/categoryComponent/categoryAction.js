import * as category from './categoryConstants'
export function getData(params){
    return {
        types:[category.CATE_REQUESTING,category.CATE_REQUESTED,category.CATE_REQUESTERROR],
        url:'/category',
        data:params,
        method:'get'
    }
}