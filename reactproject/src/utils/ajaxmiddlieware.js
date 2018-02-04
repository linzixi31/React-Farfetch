import http from './httpClient'
import * as ajaxConstants from '../constants/ajaxConstants'
export function ajaxMiddleware(api){
    console.log(api)
    return function(dispatch){
        return function(action){
            let {type, types, method = 'get', data = {}, url} = action;

            if(!url){
                return dispatch(action)
            }

            let defaultConstants = [ajaxConstants.AJAX_REQUESTING, ajaxConstants.AJAX_REQUESTED, ajaxConstants.AJAX_REQUESTERROR]
            let [requesting, requested, requesterror] = types ? types : defaultConstants;
            
            api.dispatch({type: requesting});
            if(url){
                return new Promise((resolve, reject) => {
                    http[method](url, data).then(res => {
                        console.log(res)
                        api.dispatch({
                            type: requested,
                            result:res.body.data
                            
                        })
                        resolve(res.body.data)
                    }).catch(error => {
                        api.dispatch({
                            type: requesterror,
                            result: error
                        })
                        reject(error)
                    })
                })
            }
        }
    }
}