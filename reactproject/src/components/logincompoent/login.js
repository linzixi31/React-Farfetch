import React,{Component} from 'react';
import http from '../../utils/httpClient.js';
import * as action from '../../action/login.js';
import Spinnercomponent from '../spinner/spinner.js'
import {connect} from 'react-redux'


class Logincompoent extends Component{
     state = {
       count:0
     }
     add(){
       this.props.add()
       this.setState({count:this.props.count})
     }
     remove(){
     
      this.props.remove()
      this.setState({count:this.props.count})
     }
     submit(e){
        e.preventDefault()
        this.props.spinner()
        //console.log(this.props)
        var params = {telephone:document.getElementById("firstname").value,password:document.getElementById("password").value}
        this.props.loginajax(params).then(res=>{
          console.log(res)
        }).catch(res=>{
        	console.log(res)
        })
        
    }
    render(){
        if(this.props.state==0 ){
          //console.log(this.props.state)
          var c = <Spinnercomponent/>
        }else{
          var c = null
        }
        return(
            <div>
                <form className="form-horizontal" role="form">
                  <div className="form-group">
                    <label htmlFor="firstname" className="col-sm-2 control-label">名字</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="firstname" placeholder="请输入名字"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname" className="col-sm-2 control-label">密码</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" id="password" placeholder="密码"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox"/>请记住我
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="submit" className="btn btn-default" onClick={this.submit.bind(this)}>登录</button>
                      
                    </div>
                  </div>
                </form>
                <div>{c}</div>
              
            </div>
            )
    }
}

let mapStateToProps = (state) => {
  console.log(state)
    return {
        count: state.login.count,
        loading:state.login.loading,
        result:state.login.result,
        state:state.login.status
    }

}

export default connect(mapStateToProps,action)(Logincompoent);