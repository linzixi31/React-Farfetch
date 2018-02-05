import React, {Component} from 'react'
import {Router, Route, hashHistory,Link,IndexRoute} from 'react-router'
import Foot from '../footnavcompoent/footnav.js'
import * as actions from './myAction.js'
import Back from '../backCompoent/back.js'
import {connect} from 'react-redux'
import './my.scss'
const leavenFun=function(){
    return true;
}
class MyComponent extends Component{
    componentWillMount(){
        
    }
    componentDidMount(){
        // console.log(this)
        if(this.props.router){
            this.props.router.setRouteLeaveHook(this.props.route, leavenFun)
        }
        if(window.localStorage.username){
            this.refs.unlogin.style="display:none;";
            this.refs.my_account.style="display:block;";
            this.refs.my_quit.style="display:block;";
            console.log(actions)
            this.props.getUserInformation({username:window.localStorage.username}).then(res=>{
                console.log(res);
            })
            
          
        }else{
            this.refs.unlogin.style="display:flex;";
            this.refs.my_account.style="display:none;";
            this.refs.my_quit.style="display:none;";
        }
    }
    my_quit(){
        window.localStorage.username='';
        alert('退出成功')
        this.componentDidMount();
    }
    getLogin(){
        location.href="#/login";
    }
    render(){
        return (
            <div className="my">
                <h1 className="my_header">
                    <div><i> &lt; </i></div>
                    <div><span>我的账户</span></div>
                    <div></div>
                </h1>
                
                <div className="my_main">
                    
                  
                           
                                <div className="loginAndregister" ref="unlogin" onClick={this.getLogin.bind(this)}>
                                    <div><i></i></div>
                                    <div>
                                        <h4>登录或创建新账户</h4>
                                        <p>在任何电子装置查看您的购物袋与愿望单</p>
                                    </div>
                                </div>
                                
                                <div className="myAccount" ref="my_account">
                                    <div>我的账户</div>
                                    <div>订单与退货</div>
                                    <div>个人信息与密码</div>
                                    <div>地址簿</div>
                                </div>
                    
                    
                
                    <div className="my_place">
                        <span>我的所在地</span>
                    </div>
                    <div className="my_chinaIn">
                        <i></i><span>中国内地(￥CNY)</span>
                    </div>
                    <div className="pickgender">
                        <p>语言与交易货币将依照你选择的国家/地区而定</p>
                        <h4>选择男士/女士</h4>
                    </div>
                    <div className="my_gender">
                        <p><input type="radio" name="gender"/>&nbsp;<label>女士</label></p>
                        <p><input type="radio" name="gender"/>&nbsp;<label>男士</label></p>
                    </div>
                    <div className="pickgender">
                        <p>您可以利用此功能享受app个人化购物体验，我们将优先展示最适合你的单品</p>
                        <h4>我的设定</h4>
                    </div>
                    <div className="my_inform">
                        <p>通知</p>
                        <p>指纹识别<span></span></p>
                    </div>
                    <div className="my_help">
                        <span>寻求协助</span>
                    </div>
                    <div className="my_about">
                        <p>关于我们</p>
                        <p>条款与条件</p>
                        <p>隐私政策</p>
                        <p>常见问题及指南</p>
                        <p>合作伙伴</p>
                    </div>
                    <div className="connectUs">联系我们</div>
                    <div className="telAndmsg"><button>电话</button><button>短信</button></div>
                    <div className="my_end">服务时间：周一至周五，北京时间09:00到18:00</div>
                    <div className="my_quit" ref="my_quit">
                        <h4 onClick={this.my_quit.bind(this)}>退出</h4>
                    </div>
                </div>
                <div className="my_footer">
                    {<Foot selectedTab='my'/>}
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

export default connect(mapStateToProps,actions)(MyComponent);