import React, {Component} from 'react'
import {Router, Route, hashHistory,Link,IndexRoute} from 'react-router'
import Foot from '../footnavcompoent/footnav.js'
import * as actions from './myAction.js'
import Back from '../backCompoent/back.js'
import {connect} from 'react-redux'
import './address.scss'
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';







const leavenFun=function(){
    return true;
}

class AddressComponent extends Component{
    state={
        _username:''
    }
    componentWillMount(){
        
    }
    componentDidMount(){
       this.props.getUserInformation({username:window.localStorage.username}).then(res=>{
               
                this.setState({_username:res.results[0].username});
            })
    }
 
    render(){
        return (
            <div className="address">
               <Back name={'地址簿'} />
                
                <div className="address_main">
                    <div>
                        <input type="button" value="添加新地址"/>
                    </div>
                    <div>
                        <div>
                            <ul>
                                <li>{this.state._username}</li>
                                <li>天河区</li>
                                <li>广州市</li>
                                <li>530021</li>
                                <li>中国内地</li>
                            </ul>
                        </div>
                        <div>
                            <input type="button" value="修改"/>
                        </div>
                    </div>
              
                </div>
                <div className="address_footer">
                    {<Foot/>}
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
  console.log(state)
    return {
       
    }

}

export default connect(mapStateToProps,actions)(AddressComponent);