import * as wishConstants from "./wishConstants";

export function checkList(_params) {
    return{
        types:[wishConstants.WISHLIST_REQUESTING,wishConstants.WISHLIST_REQUESTED,wishConstants.WISHLIST_REQUESTERROR],
        method:"get",
        url:"/checklist",   
        data: {userId: _params.userId}
    }
}

export function delfromwish(_params){
    return{
        types:[wishConstants.DELFROMWISH_REQUESTING,wishConstants.DELFROMWISH_REQUESTED,wishConstants.DELFROMWISH_REQUESTERROR],
        method:"post",
        url:"/delPro",
        data: { userId: _params.userId, proId: _params.proId}
    }
}