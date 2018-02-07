import * as brand from './brandConstants'
export function getBrandData(params){
    return {
        types:[brand.BRAND_REQUESTING,brand.BRAND_REQUESTED,brand.BRAND_REQUESTERROR],
        url:'/getBrand',
        data:params,
        method:'get'
    }
}