import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import './cash.scss';
import {connect} from 'react-redux';
import * as actions from './cashActions.js';
import {Toast} from 'antd-mobile';

class CashComponent extends Component{
	state = {
		orderIds:this.props.location.query.orderIds || ''
	}
	componentWillMount(){
		//获取订单id
		//获取路由参数
		var orderIds = this.props.location.query;

		this.props.getOrders(orderIds.orderIds, window.localStorage.userId);

	}
	//订单付款
	pay(){
		this.props.payOrder(this.state.orderIds).then(res =>{
			console.log(res)
			if(res.results){
				Toast.success('付款成功', 2,()=>{
					hashHistory.push({
						pathname:'/order'
					})
				});
				
			};
		});
	}
	//去往订单列表页
	goToOrderList(){
		hashHistory.push({
			pathname:'/order'
		})
	}
	//跳转到购物车
	goCart(){
		hashHistory.go(-2)
	}
	render(){
		let html = '';
		if(this.props.orderList().length > 0){
			html = <footer className="payFoot">
						<div className="seeMore" onClick={this.goToOrderList}>再看看</div>
						<div className="payBtn" onClick={this.pay.bind(this)}><span>共{this.props.orderList().length}笔订单</span>去付款</div>
					</footer>
		}else{
			html = <footer className="payFoot">
						<div className="payBtn" onClick={this.goCart.bind(this)}>去购物车看看</div>
					</footer>
		}
		return (
			<div className="paycash_ly">
				<header className="payHeader">
					<div className="payBack" onClick={this.goCart}><i className="iconfont icon-fanhui"></i></div>
					<div className="payHeaderTitle">结算</div>
				</header>
				<div className="cash_body">
					<ul className="ordersList">
						{
							this.props.orderList().map(function(item){
								var goodsIds = item.pro_Id.split(',');
								return (
									<li key={item.order_id}>
										<div className="deliveryC">发货地：<span>{item.delivery_country}</span><span className="orderPrice">总计:<span>{item.totalPrice}</span></span></div>
										<div className="orderGoods">
											<div>订单商品</div>
											<div>
												{
													this.props.orderGoods().map(function(gds){
														if(goodsIds.indexOf(String(gds.id)) >= 0){
															return (
																<img key={gds.id} src={gds.mainImg} />
															)
														}
														
													})
												}
											</div>
										</div>
										<p className="delivery_addr">收货人：<span>{item.firstname}{item.lastname}</span><span>{item.tele}</span></p>
										<p className="delivery_addr">收货地址：<span>{item.country}{item.province}{item.city}{item.addr_one}{item.addr_second}{item.addr_third}</span><span>{item.zipCode}</span></p>
									</li>
								)
							}.bind(this))
						}
					</ul>
				</div>
				{html}
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	// console.log(state)
	return {
		results:function(){
			return state.CashReducer.result == undefined ? {} : state.CashReducer.result.results
		},
		orderList:function(){
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


export default connect(mapStateToProps, actions)(CashComponent);