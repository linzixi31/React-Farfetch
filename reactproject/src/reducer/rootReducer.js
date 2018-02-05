import {combineReducers} from 'redux'
import login from './login'

import cartReducer from './../components/cartComponent/cartReducer.js'
import cateReducer from '../components/categoryComponent/cateReducer.js'
import listReducer from '../components/listCompoent/listReducer.js'

export default combineReducers({
   login,cateReducer,listReducer,cartReducer

})