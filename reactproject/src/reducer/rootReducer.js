import {combineReducers} from 'redux'
import getHot from "../components/Homecompoent/homeReducer";
import login from '../components/logincompoent/loginReducer.js'
import my from '../components/myComponent/myReducer.js'
import cartReducer from './../components/cartComponent/cartReducer.js'
import cateReducer from '../components/categoryComponent/cateReducer.js'
import listReducer from '../components/listCompoent/listReducer.js'
import payReducer from '../components/payComponent/payReducer.js'
import orderReducer from '../components/orderConponent/orderReducer.js'
import CashReducer from './../components/payComponent/cashComponent/cashReducer.js'

export default combineReducers({
   login,cateReducer,listReducer,cartReducer,my,orderReducer,getHot,payReducer,CashReducer

})