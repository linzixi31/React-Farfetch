import React,{Component} from "react";
import http from '../../utils/httpClient.js'

export default class Rescomponent extends Component{
    submit(e){
      //console.log(document.getElementById("firstname").value)
        http.get('/register',{telephone:document.getElementById("firstname").value,password:document.getElementById("password").value}).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
        e.preventDefault()
    }
    render(){
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
                    <label htmlFor="lastname" className="col-sm-2 control-label">姓</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" id="password" placeholder="请输入姓"/>
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
                      <button type="submit" className="btn btn-default" onClick={this.submit.bind(this)}>注册</button>
                    </div>
                  </div>
                </form>
            </div>
            )
    }
}