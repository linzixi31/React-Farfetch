

export function getUserInformation(params){
    return{
        url:'/userDetails',
        method:'post',
        data:params
    }
}
