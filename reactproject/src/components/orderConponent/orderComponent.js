import React, {Component} from 'react'
import {Router, Route, hashHistory,Link,IndexRoute} from 'react-router'
import Foot from '../footnavcompoent/footnav.js'
import * as actions from './orderAction.js'
import Back from '../backCompoent/back.js'
import {connect} from 'react-redux'
import Spinner from '../spinner/spinner.js'
import './order.scss'
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Icon, Grid } from 'antd-mobile';
import { PickerView } from 'antd-mobile';






const leavenFun=function(){
    return true;
}

class OrderComponent extends Component{
    state={
        _username:'',
        msg:''
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        // console.log(this)
        if(this.props.router){
            this.props.router.setRouteLeaveHook(this.props.route, leavenFun)
        }
        if(window.localStorage.userId){
           this.props.getOrderInformation({userId:window.localStorage.userId}).then(res =>{
                // console.log(res.results)
           })
          
        }else{
            
        }
    }
   
   
   
    render(){
        let html='';
        if(this.props.status===0){
            html=<Spinner/>;
        }else if(this.props.status===1){
            html='';
        }

        return (
            <div className="order">
               <Back name={'订单与退货'} />
                
                <ul className="order_main">
                    
                {
                   
                   this.props.datas.map(function(item){
                
                        return(
                            <li key={item.order_id}>
                                <h4>
                                    <span><img src={item.country_img}/>{item.country_name}</span>
                                    <span>{item.status==0?'买家未付款':'交易完成'}</span>
                                </h4>
                                <div>
                                    <div><img src={item.mainImg}/></div>
                                    <div>
                                        <p>{item.title}</p>
                                        <p>{item.descriptions}</p>

                                    </div>
                                    <div> 
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <p></p>
                            </li>

                            )
                   }.bind(this))
                }
                           
                             
                </ul>
                <div className="order_footer">
                    {<Foot/>}
                </div>
                {html}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
  console.log(state)
    return {
       datas:state.orderReducer.result==undefined ? [] : state.orderReducer.result.results,
       status:state.orderReducer.status
    }

}

export default connect(mapStateToProps,actions)(OrderComponent);