import React, {Component} from 'react';
import './cash.scss';
import {connect} from 'react-redux';
import * as actions from './payActions.js';

class CashComponent extends Component{
	state = {
		orderIds:this.props.location.query.orderIds || ''
	}
	componentWillMount(){
		//获取订单id
		//获取路由参数
		var orderIds = this.props.location.query;

		this.props.getOrders(orderIds.orderIds, window.localStorage.userId).then(res =>{
			console.log(res)
		})
	}
	//订单付款
	pay(){
		this.props.payOrder(this.state.orderIds).then(res =>{
			console.log(res);
		});
	}
	render(){
		return (
			<div className="paycash_ly">
				<header className="payHeader">
					<div className="payBack" ><i className="iconfont icon-fanhui"></i></div>
					<div className="payHeaderTitle">结算</div>
				</header>
				<div className="cash_body">
					<ul className="ordersList">
						{
							this.props.orderList.map(function(item){
								var goodsIds = item.pro_Id.split(',');
								return (
									<li key={item.order_id}>
										<p className="orderTitle">订单时间：<span>{item.create_time}</span></p>
										<div className="deliveryC">发货地：<span>{item.delivery_country}</span></div>
										<div className="orderGoods">
											<div>订单商品</div>
											<div>
												{
													this.props.orderGoods.map(function(gds){
														if(goodsIds.indexOf(String(gds.id)) >= 0){
															return (
																<img key={gds.id} src={gds.mainImg} />
															)
														}
														
													})
												}
											</div>
										</div>
										<p className="orderPrice">订单总价：<span>{item.totalPrice}</span></p>
										<p className="delivery_addr">收货人：<span>{item.firstname}{item.lastname}</span><span>{item.tele}</span></p>
										<p className="delivery_addr">收货地址：<span>{item.country}{item.province}{item.city}{item.addr_one}{item.addr_second}{item.addr_third}</span><span>{item.zipCode}</span></p>
									</li>
								)
							}.bind(this))
						}
					</ul>
				</div>
				<footer className="payFoot">
					<div className="cartTotalPrice">
						<div className="cartPrice1">
							<p>小计 ￥<span></span></p>
							<p>配送 ￥<span></span></p>
						</div>
						<div className="cartPrice2">
							<p>总计 CNY ￥<span></span></p>
							<p>（已含关税）</p>
						</div>
					</div>
					<div className="payBtn" onClick={this.pay.bind(this)}><span>共{this.props.orderList.length}笔订单</span>去付款</div>
				</footer>
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	// console.log(state)
	return {
		orderList:state.payReducer.result == undefined ? [] : state.payReducer.result.results.orders,
		orderGoods:state.payReducer.result == undefined ? [] : state.payReducer.result.results.goods
	}
}


export default connect(mapStateToProps, actions)(CashComponent);