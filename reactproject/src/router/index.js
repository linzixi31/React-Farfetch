import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import 'antd-mobile/dist/antd-mobile.css';
import HomeComponent from "../components/Homecompoent/Home.js";
import LoginComponent from "../components/logincompoent/loginComponent.js";
import rootReducer from '../reducer/rootReducer.js'
import My from '../components/myComponent/myComponent.js'
import DetailComponent from "../components/detail/detail.js";
import cartComponent from './../components/cartComponent/cartComponent';
import ListComponent from "../components/listCompoent/listCompoent.js"
import CategoryComponent from "../components/categoryComponent/category.js"
import ChoseComponent from "../components/listCompoent/choseComponent/chose.js"
import SearchComponent from "../components/searchCompoent/search.js"

const  route = (
   <Router path='/' component={HomeComponent}>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/detail" component={DetailComponent}></Route>
        <Route path="/my" component={My}></Route>
        <Route path="/cart" component={cartComponent}></Route>
        <Route path="/list" component={ListComponent}></Route>
        <Route path="/category" component={CategoryComponent}></Route>
        <Route path="/chose" component={ChoseComponent}></Route>
        <Route path="/search" component={SearchComponent}></Route>
   </Router>

        )
export default route

