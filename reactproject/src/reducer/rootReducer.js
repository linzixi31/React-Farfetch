import {combineReducers} from 'redux'
import login from './login'
import cartReducer from './../components/cartComponent/cartReducer';




export default combineReducers({
   login,
   cartReducer
})