import {combineReducers} from 'redux'
import login from '../components/logincompoent/loginReducer.js'
import my from '../components/myComponent/myReducer.js'

export default combineReducers({
   login,my
})