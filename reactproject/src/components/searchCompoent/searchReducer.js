import * as searchConstants from './searchConstants.js'

export default function login(state={},action){
        var newstate = JSON.parse(JSON.stringify(state))
        switch(action.type){
            case searchConstants.SEARCH_REQUESTING :
                  newstate.status = 0
            break;
            case searchConstants.SEARCH_REQUESTED :
                  newstate.status = 1
                  newstate.result = action.result.results
            break;
            case searchConstants.SEARCH_REQUESTERROR :
                  newstate.status = -1
            break; 
            
        }
        //console.log(newstate)
        return newstate;
        
}