import React from 'react';
import ReactDOM from "react-dom";
import {Router, hashHistory} from "react-router";
import route from './router'
import {Provider} from 'react-redux'
import store from './store/Store.js'


//routes react自带属性
ReactDOM.render(
   <Provider store={store}>
    <Router history={hashHistory} routes={route}></Router>
    </Provider>
    ,document.getElementById('app'))  