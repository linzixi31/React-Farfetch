import {combineReducers} from 'redux'
import login from './login'
import getHot from "../components/Homecompoent/homeReducer";

export default combineReducers({
   login,
   getHot
})