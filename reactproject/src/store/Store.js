import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {ajaxMiddleware} from '../utils/ajaxmiddlieware'
import reducer from '../reducer/rootReducer.js'


const store = createStore(reducer, applyMiddleware(ajaxMiddleware))

export default store