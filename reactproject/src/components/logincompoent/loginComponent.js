import React,{Component} from 'react';
import http from '../../utils/httpClient.js';
import * as action from './loginAction.js';
import Spinnercomponent from '../spinner/spinner.js'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import './login.scss'


class Logincompoent extends Component{
    

    componentDidMount(){
        this.showLogin();
    }
    showLogin(){
        this.refs.zjx_login.style='display:block;';
        this.refs.zjx_reg.style='display:none';
        this.refs.login_border.style='border-bottom:2px solid #000;';
        this.refs.reg_border.style='border-bottom:none;';

    }
    showReg(){
        this.refs.zjx_login.style='display:none';
        this.refs.zjx_reg.style='display:block;';
        this.refs.reg_border.style='border-bottom:2px solid #000;';
        this.refs.login_border.style='border-bottom:none;';
    }
    submit_login(){
        var self=this;
        this.props.loginTest({username:self.refs.login_email.value,password:self.refs.login_password.value}).then(res =>{
            
            
            if(res.results.length>0){
                window.localStorage.username=self.refs.login_email.value;
                alert('登录成功');
                location.href='#/my'
               
            }else{
                alert('登陆失败');
                self.refs.login_email.value='';
                self.refs.login_password.value='';
            }
            
        })
      
    }
    submit_reg(){
       var self=this;
       var emailRegExp=/^[\w]+[\@]{1}[\w]+[\.][\w]+$/
       var passwordRegExp=/^[\w]{6,20}$/
       var username_value=self.refs.reg_username.value;
       var email_value=self.refs.reg_email.value;
       var password_value=self.refs.reg_password.value;
       if(emailRegExp.test(email_value)&&passwordRegExp.test(password_value)){
            this.props.registerTest({username:username_value,email:email_value,password:password_value}).then(res => {
                //  console.log(res);
                if(res){
                    alert('注册成功');
                    self.refs.reg_username.value='';
                    self.refs.reg_email.value='';
                    self.refs.reg_password.value='';
                    // location.href='#/my'

                }else{
                    alert('注册失败')
                }
            })

       }else{
            alert('账号为email格式，密码需要六位以上');
            self.refs.reg_username.value='';
            self.refs.reg_email.value='';
            self.refs.reg_password.value='';

       }
       
     
    }
    back(){
        location.href="#/my"
    }
    getFocus(a){
     
      this.refs[a].style='border-bottom:3px solid black;color:black;'


    }
    getBlur(a){
      this.refs[a].style='border-bottom:1px solid #ccc;'
    }
    render(){
        if(this.props.state==0 ){
        //   console.log(this.props.state)
          var c = <Spinnercomponent/>
        }else{
          var c = null
        }
        return(
             <div className="zjx_loginAndreg">
                <div className="zjx_nav">
                    <i onClick={this.back.bind(this)}>&lt;返回</i>
                    
                </div>
                <div>
                    <h4><span ref="login_border" onClick={this.showLogin.bind(this)}>登录</span><span ref="reg_border" onClick={this.showReg.bind(this)}>创建账户</span></h4>
                    <div className="zjx_login" ref="zjx_login">
                       
                        <div>
                           
                            <input type="text" ref="login_email" placeholder="电邮地址" onFocus={this.getFocus.bind(this,'login_email')}  onBlur={this.getBlur.bind(this,'login_email')}/>
                        </div>
                        <div>
                            
                            <input type="text" ref="login_password" placeholder="密码" onFocus={this.getFocus.bind(this,'login_password')} onBlur={this.getBlur.bind(this,'login_password')}/>
                        </div>
                        <div><input type="button" value="登录" onClick={this.submit_login.bind(this)}/></div>
                        <h4>忘记密码</h4>
                    </div>
                    <div className="zjx_reg" ref="zjx_reg">
                        <div>
                            <div className="container">
                                <div>
                                    <input type="text" ref="reg_username" placeholder="姓名" onFocus={this.getFocus.bind(this,'reg_username')} onBlur={this.getBlur.bind(this,'reg_username')}/>
                                </div>
                                
                                <div>
                                    <input type="text" ref="reg_email" placeholder="电邮地址" onFocus={this.getFocus.bind(this,'reg_email')} onBlur={this.getBlur.bind(this,'reg_email')}/>
                                </div>
                                <div>
                                    <input type="text" ref="reg_password" placeholder="密码" onFocus={this.getFocus.bind(this,'reg_password')} onBlur={this.getBlur.bind(this,'reg_password')}/>
                                </div>
                                <div className="text">
                                    <h4>一旦注册代表您同意我们的条款与条件和隐私政策</h4>
                                    <p>抢购先选购Farfetch折扣精品、新品与促销活动。您随时可以选择退出。</p>
                                </div>
                            </div>
                            <div className="reg_button">
                                <input type="button" value="创建账户" onClick={this.submit_reg.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            
        
          )
    }
}

let mapStateToProps = (state) => {
//   console.log(state)
    return {
        count: state.login.count,
        loading:state.login.loading,
        result:state.login.result,
        state:state.login.status,
        token:state.login.token
    }

}

export default connect(mapStateToProps,action)(Logincompoent);