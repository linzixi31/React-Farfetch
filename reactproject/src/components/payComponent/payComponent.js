import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from './payActions';

import './pay.scss';

class PayComponent extends Component{
	state = {
		totalPrice:0,
		orders:[],
		cartIds:'',
		addr_id:''
	}
	componentDidMount(){
		//获取路由参数
		var orderIdsObj = this.props.location.query;
		
		// console.log(orderIdsObj);
		this.setState({
			totalPrice:orderIdsObj.totalPrice,
			orders:JSON.parse(orderIdsObj.orders),
			cartIds:orderIdsObj.cartIds
		})

		this.props.getAddresses(1).then(res=>{
			console.log(res)
			this.setState({
				addr_id:res.results[0].addr_id
			})
		});


	}
	//选择地址
	chooseAddr(e){
		// console.log(e.target.parentNode.parentNode)
		if(e.target.parentNode.parentNode.tagName.toLowerCase() === 'section'){
			let data = {userId:1};
			//跳转传参
			var path = {
			  	pathname:'/chooseaddress',
			  	query:data,
			}
			hashHistory.push(path);
		}
	}
	//生成订单
	createOrder(){
		let orders = JSON.stringify(this.state.orders);
		let cartIds = this.state.cartIds;
		let addr_id = this.state.addr_id;
		console.log(addr_id);
		this.props.createOrder(orders,cartIds,addr_id).then(res =>{
			console.log(res);
			//获取生产的订单ID
			hashHistory.push({
				pathname:'/cart'
			})
		});
	}
	//返回
	goBack(){
		hashHistory.go(-1);
	}
	render(){
		return (
			<div className="pay_ly">
				<header className="payHeader">
					<div className="payBack" onClick={this.goBack.bind(this)}><i className="iconfont icon-fanhui"></i></div>
					<div className="payHeaderTitle">结算</div>
				</header>
				<div className="payBody">
					<section className="pay_shippingAaddress" onClick={this.chooseAddr.bind(this)}>
						<div className="pay_infor_left">配送</div>
						<div className="pay_infor_middle">
							<p className="infor_mid_title">收货地址</p>
							<p className="infor_mid_context">
								{
									this.props.addresses.map(function(item){
										if(item != '请选择收货地址'){
											return item.firstname + item.lastname + item.tele + item.country + item.province + item.city + item.addr_one + item.addr_second + item.addr_third + item.zipCode
										}else{
											return '请选择收货地址'
										}
									})
								}
							</p>
						</div>
						<div className="pay_icon_right">
							<span>&gt;</span>
						</div>
					</section>
					<section className="pay_distributionBy">
						<div className="pay_infor_left">配送方式</div>
						<div className="pay_infor_middle">
							<p className="infor_mid_title">{this.state.orders.length}笔订单</p>
							<p className="infor_mid_context">从
								{
									this.state.orders.map(function(item,idx){
										return (
											<span key={idx}>{item.country}</span>
										)
									})
								}配送
							</p>
						</div>
						<div className="pay_icon_right">
							<span>&gt;</span>
						</div>
					</section>
					<section className="pay_method">
						<div className="pay_infor_left">支付</div>
						<div className="pay_infor_middle">
							<p className="infor_mid_title">支付方式</p>
							<p className="infor_mid_context">请选择支付方式</p>
						</div>
						<div className="pay_icon_right"></div>
					</section>
				</div>
				<footer className="payFoot">
					<div className="cartTotalPrice">
						<div className="cartPrice1">
							<p>小计 ￥<span>{this.state.totalPrice}</span></p>
							<p>配送 ￥<span>{this.state.totalPrice}</span></p>
						</div>
						<div className="cartPrice2">
							<p>总计 CNY ￥<span>{this.state.totalPrice}</span></p>
							<p>（已含关税）</p>
						</div>
					</div>
					<div className="payBtn" onClick={this.createOrder.bind(this)}>确认下单</div>
				</footer>
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	
	return {
		addresses:state.payReducer.result == undefined ? ['请选择收货地址'] : state.payReducer.result.results
	}
}

export default connect(mapStateToProps, actions)(PayComponent);