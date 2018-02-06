import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import 'antd-mobile/dist/antd-mobile.css';
import HomeComponent from "../components/Homecompoent/Home.js";
import LoginComponent from "../components/logincompoent/loginComponent.js";
import rootReducer from '../reducer/rootReducer.js'
import My from '../components/myComponent/myComponent.js'
import ListComponent from "../components/listCompoent/listCompoent.js"
import DetailComponent from "../components/detail/detail.js";
import cartComponent from './../components/cartComponent/cartComponent';
import CategoryComponent from "../components/categoryComponent/category.js"
import OrderComponent from "../components/orderConponent/orderComponent.js"
import WishListComponent from "../components/wishListComponent/wishListComponent.js"
import PersonalComponent from "../components/myComponent/personalInformation.js"
import AddressComponent from "../components/myComponent/addressComponent.js"
const  route = (
   <Router path='/' >
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/index" component={HomeComponent}></Route>
        <Route path="/detail" component={DetailComponent}></Route>
        <Route path="/my" component={My}></Route>
        <Route path="/cart" component={cartComponent}></Route>
        <Route path="/list" component={ListComponent}></Route>
        <Route path="/category" component={CategoryComponent}></Route>
        <Route path="/order" component={OrderComponent}></Route>
        <Route path="/wishlist" component={WishListComponent}></Route>
        <Route path="/personal" component={PersonalComponent}></Route>
        <Route path="/address" component={AddressComponent}></Route>

    
   </Router>

        )
export default route

