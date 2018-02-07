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
            case ListConstants.ListBRAND_REQUESTING :
                  newstate.status = 0
            break;
            case ListConstants.ListBRAND_REQUESTED :
                  newstate.status = 1
                  newstate.result = action.result.results
            break;
            case ListConstants.ListBRAND_REQUESTERROR :
                  newstate.status = -1
            break;
            case ListConstants.STAR_REQUESTING :
                  newstate.status = 0
            break;
            case ListConstants.STAR_REQUESTED :
                  newstate.status = 1
                  newstate.starresult = action.result.results
            break;
            case ListConstants.STAR_REQUESTERROR :
                  newstate.status = -1
            break;
            case ListConstants.setSTAR_REQUESTING :
                  newstate.status = 0
            break;
            case ListConstants.setSTAR_REQUESTED :
                  newstate.status = 1
                  newstate.setstarresult = action.result.results
            break;
            case ListConstants.setSTAR_REQUESTERROR :
                  newstate.status = -1
            break;
        }
        //console.log(newstate)
        return newstate;
        
}