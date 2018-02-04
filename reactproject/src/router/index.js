import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import 'antd-mobile/dist/antd-mobile.css';
import HomeComponent from "../components/Homecompoent/Home.js";
import LoginComponent from "../components/logincompoent/login.js";
import DetailComponent from "../components/detail/detail.js";
import Rescomponent from "../components/regsiter/res.js"
import Footnav from "../components/footnavcompoent/footnav.js"
import Back from "../components/backCompoent/back.js"
import ListComponent from "../components/listCompoent/listCompoent.js"
import CategoryComponent from "../components/categoryComponent/category.js"
const  route = (
   <Router path='/' component={HomeComponent}>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/detail" component={DetailComponent}></Route>
        <Route path="/res" component={Rescomponent}></Route>
        <Route path="/foot" component={Footnav}></Route>
        <Route path="/back" component={Back}></Route>
        <Route path="/list" component={ListComponent}></Route>
        <Route path="/category" component={CategoryComponent}></Route>
   </Router>

        )
export default route

