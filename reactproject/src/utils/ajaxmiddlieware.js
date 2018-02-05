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
            
            api.dispatch({type: ajaxConstants.AJAX_REQUESTING});
            if(url){
                return new Promise((resolve, reject) => {
                    http[method](url, data).then(res => {
                        
                        api.dispatch({
                            type: ajaxConstants.AJAX_REQUESTED,
                            result: res.body.data,
                            token : res.body.token
                        })
                        resolve(res.body.data)
                    }).catch(error => {
                        api.dispatch({
                            type: ajaxConstants.AJAX_REQUESTERROR,
                            result: error
                        })
                        reject(error)
                    })
                })
            }
        }
    }
}