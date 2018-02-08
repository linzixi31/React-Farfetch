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
        _username:''
    }
 
    componentDidMount(){
   
        if(window.localStorage.userId){
           this.props.getOrderInformation({userId:window.localStorage.userId,select:'all'}).then(res =>{
                
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
                   this.props.orderLists().map(function(item){
                        var goodsIds = item.pro_Id.split(',');
                        var orderType;
                        if(item.status==0){
                            orderType = <span className="unpaid">买家未付款</span>;
                        }else if(item.status==1){
                            orderType = <span className="waitDelivery">等待卖家发货</span>;
                        }else{
                            sg='订单已取消'
                        }
                        return(
                            <li key={item.order_id}>
                                <h4>
                                    <span>从<span>{item.delivery_country}</span>发出</span>
                                    {orderType}
                                </h4>
                                {
                                    this.props.orderGoods().map(function(gds){
                                        if(goodsIds.indexOf(String(gds.id)) >= 0){
                                            return (
                                                <div className="proDetails" key={gds.id}>
                                                    <img key={gds.id} src={gds.mainImg} />
                                                    <p className="proName">{gds.title}</p>
                                                    <p className="proPrice">{gds.currentPrice}</p>
                                                </div> 
                                            )
                                        }
                                        
                                    })
                                }
                                 <h4 className="orderTime">订单时间：{new Date(item.create_time).toLocaleString()}</h4>
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
  // console.log(state)
    return {
       results:function(){
            return state.orderReducer.result == undefined ? {} : state.orderReducer.result.results
        },
        orderLists:function(){
            if(this.results().orders){
                return this.results().orders;
            }else{
                return []
            }
        },
        orderGoods:function(){
            if(this.results().goods){
                return this.results().goods;
            }else{
                return []
            }
        }
    }

}

export default connect(mapStateToProps,actions)(OrderComponent);