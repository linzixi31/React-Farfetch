import * as ListConstants from './ListConstants'

export default function login(state={},action){
        var newstate = JSON.parse(JSON.stringify(state))
        switch(action.type){
            case ListConstants.List_REQUESTING :
                  newstate.status = 0
            break;
            case ListConstants.List_REQUESTED :
                  newstate.status = 1
                  newstate.result = action.result.results
            break;
            case ListConstants.List_REQUESTERROR :
                  newstate.status = -1
            break;
        }
        //console.log(newstate)
        return newstate;
        
}