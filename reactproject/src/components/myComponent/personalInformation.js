import React, {Component} from 'react'
import {Router, Route, hashHistory,Link,IndexRoute} from 'react-router'
import Foot from '../footnavcompoent/footnav.js'
import * as actions from './myAction.js'
import Back from '../backCompoent/back.js'
import {connect} from 'react-redux'
import './personalInformation.scss'
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';







const leavenFun=function(){
    return true;
}

class PersonalComponent extends Component{
    state={
        _username:'',
        _email:''
    }
    componentWillMount(){
        
    }
    componentDidMount(){
       this.props.getUserInformation({username:window.localStorage.username}).then(res=>{
               
                this.setState({_username:res.results[0].username});
                this.setState({_email:res.results[0].email});

            })
    }
 
    render(){
        return (
            <div className="personal">
               <Back name={'个人信息与密码'} />
                
                <div className="personal_main">
                    <div><span>个人资料</span><span>必填栏* </span></div>
                    <div>
                        <p><input type="text" placeholder={this.state._username}/></p>
                        <p><input type="text" placeholder={this.state._email}/></p>
                        <p><input type="text" placeholder="生日"/></p>
                    </div>
                    <div>密码与安全性</div>
                    <div>
                        <p><input type="button" value="变更密码"/></p>
                        <p>为了您的账户安全性，我们建议您每三个月更换一次密码</p>
                    </div>
              
                </div>
                <div className="personal_footer">
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

export default connect(mapStateToProps,actions)(PersonalComponent);