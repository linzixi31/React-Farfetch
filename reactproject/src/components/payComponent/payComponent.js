import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from './payActions';
import {Toast} from 'antd-mobile';

import './pay.scss';

class PayComponent extends Component{
	state = {
		userId:window.localStorage.userId,
		totalPrice:0,
		orders:[],
		cartIds:'',
		addr_id:'',
		payMethod:'alipay'
	}
	componentDidMount(){

		this.setState({
			totalPrice:this.props.totalPrice(),
			orders:this.props.ordersCates(),
			cartIds:this.props.cartIds()
		})
		
		//获取用户默认地址
		this.props.getAddresses(window.localStorage.userId, 1).then(res=>{
			// console.log(res)
			if(res.results.length != 0){
				this.setState({
					addr_id:res.results[0].addr_id
				})
			}
		});

	}
	//选择地址
	chooseAddr(e){
		
		if(e.target.parentNode.parentNode.tagName.toLowerCase() === 'section'){
			let data = {userId:this.state.userId};
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
		// console.log(orders,cartIds,addr_id);
		if(this.state.addr_id == ''){
			Toast.fail('请添加收货地址', 2);
			return;
		}
		if(this.state.payMethod == ''){
			Toast.fail('请选择支付方式', 2);
			return;
		}

		this.props.createOrder(orders,cartIds,addr_id,window.localStorage.userId).then(res =>{
			// console.log(res);
			//获取生产的订单ID
			let orderIds = [];
			res.results.forEach(function(item){
				if(item.insertId != 0){
					orderIds.push(item.insertId)
				}
			});
			// console.log(orderIds)
			hashHistory.push({
				pathname:'/cash',
				query:{orderIds:orderIds.join(',')}
			})
		});
	}
	//返回
	goBack(){
		hashHistory.go(-1);
	}
	render(){
		let addrIcon;
		let payIcon;
		if(this.state.addr_id != ''){
			addrIcon = <i className="iconfont icon-zhengquequeding"></i>;
		}else{
			addrIcon = <i className="iconfont icon-shibai"></i>;
		}
		if(this.state.payMethod != ''){
			payIcon = <i className="iconfont icon-zhengquequeding"></i>;
		}else{
			payIcon = <i className="iconfont icon-shibai"></i>;
		}
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
									this.props.addresses().map(function(item){
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
							{addrIcon}
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
							<i className="iconfont icon-zhengquequeding"></i>
						</div>
					</section>
					<section className="pay_method">
						<div className="pay_infor_left">支付</div>
						<div className="pay_infor_middle">
							<p className="infor_mid_title">支付方式</p>
							<p className="infor_mid_context">请选择支付方式</p>
						</div>
						<div className="pay_icon_right">
							{payIcon}
						</div>
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
	// console.log(state)
	return {
		addresses:function(){
			if(state.payReducer.result == undefined){
				return ['请选择收货地址'];
			}else if(state.payReducer.result.results.length == 0){
				return ['请选择收货地址'];
			}else{
				return state.payReducer.result.results;
			}
		},
		//总价
		totalPrice:function(){
			let totalP = 0;
			state.cartReducer.cartList.results.map(function(item){
				totalP += item.currentPrice * item.qty;
			})
			return totalP;
		},
		//购物车的ids
		cartIds:function(){
			let cartIds = '';
			state.cartReducer.cartList.results.map(function(item){
				cartIds += item.cart_id + ',';
			})
			return cartIds.slice(0,-1);
		},
		//根据不同国家生成不同订单（数组，同一个国家多个商品生成一个订单）
		ordersCates:function(){
			let orders = [];
			state.cartReducer.cartList.results.forEach(function(item){
				let i = 0;
				orders.forEach(function(or){
					if(or.country != item.country_name){
						i++;
					}else{
						return;
					}
				})
				if(i == orders.length){
					orders.push({country:item.country_name,proids:item.id,totalPrice:item.currentPrice})
				}else{
					orders[i].proids += ',' + item.id;
					orders[i].totalPrice += item.currentPrice;
				}
			})
			return orders;
		}

	}
}

export default connect(mapStateToProps, actions)(PayComponent);