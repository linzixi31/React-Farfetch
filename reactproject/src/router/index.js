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
import ChoseComponent from "../components/listCompoent/choseComponent/chose.js"
import SearchComponent from "../components/searchCompoent/search.js"
import WishListComponent from "../components/wishListComponent/wishListComponent.js"
import PersonalComponent from "../components/myComponent/personalInformation.js"
import AddressComponent from "../components/myComponent/addressComponent.js"
import ParentCompoent from "../components/Homecompoent/parent.js"
import ListIndexedComponent from "../components/listCompoent/choseComponent/listindexedComponent/listindexed.js"
import OrderComponent from "../components/orderConponent/orderComponent.js"



const  route = (
   <Router path='/' component={ParentCompoent}>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/index" component={HomeComponent}></Route>
        <Route path="/detail" component={DetailComponent}></Route>
        <Route path="/my" component={My}></Route>
        <Route path="/cart" component={cartComponent}></Route>
        <Route path="/list" component={ListComponent}></Route>
        <Route path="/category" component={CategoryComponent}></Route>
        <Route path="/chose" component={ChoseComponent}></Route>
        <Route path="/search" component={SearchComponent}></Route>
        <Route path="/order" component={OrderComponent}></Route>
        <Route path="/wishlist" component={WishListComponent}></Route>
        <Route path="/personal" component={PersonalComponent}></Route>
        <Route path="/address" component={AddressComponent}></Route>
        <Route path="/listindexed" component={ListIndexedComponent}></Route>
   </Router>

        )
export default route

