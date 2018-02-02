function verification(_url, _params){
    return {
        types: ['verificationbeforeRequest', 'verificationRequested', 'verificationRequestError'],
        url: 'verification.php',
        method:'get',
        params: _params
    }
}
var storage = window.localStorage;
export default function verificationReducer(state = {}, action){
    var verificationState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'verificationbeforeRequest':
            verificationState.status = 0;
            break;
        case 'verificationRequested':
            verificationState.status = 1;
            verificationState.response = action.response;
            break;
        case 'verificationRequestError':
            verificationState.status = -1;
            verificationState.error = action.error;
            break;
    }

    return verificationState;
}
export default storage.setItem('verification',verification);