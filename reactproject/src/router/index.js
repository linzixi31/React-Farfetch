import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import 'antd-mobile/dist/antd-mobile.css';
import HomeComponent from "../components/Homecompoent/Home.js";
<<<<<<< HEAD
import LoginComponent from "../components/logincompoent/loginComponent.js";
import Rescomponent from "../components/regsiter/res.js"
import Footnav from "../components/footnavcompoent/footnav.js"
import Back from "../components/backCompoent/back.js"
import rootReducer from '../reducer/rootReducer.js'
import My from '../components/myComponent/myComponent.js'
import ListComponent from "../components/listCompoent/listCompoent.js"

=======
import LoginComponent from "../components/logincompoent/login.js";
import DetailComponent from "../components/detail/detail.js";
import Rescomponent from "../components/regsiter/res.js"
import Footnav from "../components/footnavcompoent/footnav.js"
import Back from "../components/backCompoent/back.js"

import rootReducer from '../reducer/rootReducer.js'

import cartComponent from './../components/cartComponent/cartComponent';





import ListComponent from "../components/listCompoent/listCompoent.js"
import CategoryComponent from "../components/categoryComponent/category.js"
>>>>>>> 993d50af509300041eac24075004479ad2fc7865
const  route = (
   <Router path='/' component={HomeComponent}>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/detail" component={DetailComponent}></Route>
        <Route path="/res" component={Rescomponent}></Route>
        <Route path="/foot" component={Footnav}></Route>
        <Route path="/back" component={Back}></Route>
<<<<<<< HEAD
        <Route path="/my" component={My}></Route>
=======
        <Route path="/cart" component={cartComponent}></Route>
>>>>>>> 993d50af509300041eac24075004479ad2fc7865
        <Route path="/list" component={ListComponent}></Route>
        <Route path="/category" component={CategoryComponent}></Route>
   </Router>

        )
export default route

