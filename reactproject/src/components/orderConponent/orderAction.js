export function getOrderInformation(params){
    return{
        url:'/orderDetails',
        method:'post',
        data:params
    }
}
