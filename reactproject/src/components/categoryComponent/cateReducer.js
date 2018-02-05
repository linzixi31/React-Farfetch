import * as category from './categoryConstants'

export default function login(state={},action){
        var newstate = JSON.parse(JSON.stringify(state))
        switch(action.type){
            case category.CATE_REQUESTING :
                  newstate.status = 0
            break;
            case category.CATE_REQUESTED :
                  newstate.status = 1
                  newstate.result = action.result.results
            break;
            case category.CATE_REQUESTERROR :
                  newstate.status = -1
            break;
        }
        return newstate;
        

    }