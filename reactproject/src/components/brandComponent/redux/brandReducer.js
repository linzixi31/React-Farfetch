import * as brand from './brandConstants'

export default function login(state={},action){
        var newstate = JSON.parse(JSON.stringify(state))
        switch(action.type){
            case brand.BRAND_REQUESTING :
                  newstate.status = 0
            break;
            case brand.BRAND_REQUESTED :
                  newstate.status = 1
                  newstate.result = action.result.results
            break;
            case brand.BRAND_REQUESTERROR :
                  newstate.status = -1
            break;
        }
        return newstate;
    }