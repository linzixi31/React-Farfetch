import {combineReducers} from 'redux'
import login from '../components/logincompoent/loginReducer.js'
import my from '../components/myComponent/myReducer.js'

import cartReducer from './../components/cartComponent/cartReducer.js'
import cateReducer from '../components/categoryComponent/cateReducer.js'
import listReducer from '../components/listCompoent/listReducer.js'

export default combineReducers({
<<<<<<< HEAD
   login,my
=======
   login,cateReducer,listReducer,cartReducer

>>>>>>> 993d50af509300041eac24075004479ad2fc7865
})