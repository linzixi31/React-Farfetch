import React, {Component} from 'react';

import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as actions from './cartActions';

// import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import Spinner from './../spinner/spinner';
import SizeQty from './sizeQtySelect';

import './cart.scss';


class CartComponent extends Component{
	componentWillMount(){
		if(this.state.userId != ''){
			//请求购物车数据
			this.props.getCartProduct(this.state.userId);

		}
		
	}
	//data：存储尺码数量数据；selectTitle：尺码选择弹出层的标题；switchType：要改变的字段名；changeCartId：要改变的购物车id
	//switch：控制弹出层显示隐藏的开关
	state = {
		userId:window.localStorage.userId || '',
		switch:0,
		data:'',
		selectTitle:'',
		switchType:'',
		changeCartId:'',
		cartHead:"我的购物袋",
		cartEmpty:'购物袋中暂无商品',
		helpTitle:'14天无理由免费退货（退款含税）',
		helpContent:'还在犹豫？别担心，我们提供14天无理由免费退货。来自中国内地的退货，你的退款将包含下单时所支付的关税。'
	}
	//改变数量尺码
	getSizeQty(res){
		//改变购物车中的加购商品信息
		if(res != 'none'){
			
			this.props.changeCart(this.state.userId,res,this.state.switchType,this.state.changeCartId);
		}
		this.setState({switch:0});
	}
	//改变购物车状态
	changeCartPro(event){
		if(event.target.className.toLowerCase() === 'cartdelete'){
			//删除购物车商品信息
			let delId = event.target.getAttribute('data-guid');
			this.props.deleteCartPro(this.state.userId,delId);
		}else if(event.target.className.toLowerCase() === 'towishbtn'){
			//从购物车添加到心愿单
			let wishId = event.target.getAttribute('data-guid');
			this.props.addToWish(this.state.userId,wishId);
		}else if(event.target.className.toLowerCase() === 'cartqtysel'){
			//改变数量
			let cartid = event.target.getAttribute('data-guid');

			this.setState({
				switch:1,
				data:'1,2',
				selectTitle:'请选择数量（最多购买2件）',
				changeCartId:cartid,
				switchType:'qty'
			});
			
		}else if(event.target.className.toLowerCase() === 'cartsizesel'){
			//改变尺码
			let cartid = event.target.getAttribute('data-guid');
			//找出当前商品的尺码
			let proSize = this.props.cartList.filter(function(item){
				return item.cart_id == cartid;
			})[0].size;
			//判断尺码是否为均码（free）
			proSize = proSize==null ? 'free,' : proSize;
			this.setState({
				switch:1,
				data:proSize,
				selectTitle:'请选择尺码',
				changeCartId:cartid,
				switchType:'user_size'
			});
		}
	}
	//跳转页面
	toOrder(){
		if(!window.localStorage.userId){
			hashHistory.push({
				pathname:'/login'
			})
			return;
		}
		if(window.localStorage.userId && this.props.cartList.length == 0){
			hashHistory.push({
				pathname:'/index'
			})
			return;
		}
		if(window.localStorage.userId){
			//跳转
			hashHistory.push({
			  	pathname:'/pay',
			});
		}

	}
	showPhone(){
		layer.open({
			title: [
			    '联系电话',
			    'background-color: #FF4351; color:#fff;'
		    ],
		    content: '电话：13666666666',
		    btn:'OK',
		   	className:'layerAlert'
		});
	}
	showEmail(){
		layer.open({
			title: [
			    '电邮地址',
			    'background-color: #FF4351; color:#fff;'
		    ],
		    content: 'Email：290035807@qq.com',
		    btn:'OK',
		   	className:'layerAlert'
		});
	}
	//返回
	goBack(){
		hashHistory.go(-1);
	}
	render(){
		//购物车无商品信息时
		let styleShow,styleHide;
		let cartBtn = '';
		if(this.props.cartList.length == 0){
			styleShow = {display:'block'};
			styleHide = {visibility:'hidden'};
			cartBtn = '立即选购';
		}else{
			styleShow = {display:'none'};
			styleHide = {visibility:'visible'};
			cartBtn = '结算';
		}

		//判断是否弹出loading层
		let html = '';
		if(this.props.status == 0){
			html = <Spinner />;

		}else if(this.props.status == 1){
			html = '';
		};
		//判断是否显示尺码选择弹出层子组件
		if(this.state.switch == 1){
			html = <SizeQty cb={this.getSizeQty.bind(this)} data={this.state.data} title={this.state.selectTitle}/>;
		}
		return (
			<div className="cart_ly">
				<header className="cartHeader">
					<div className="cartBack" onClick={this.goBack}><i className="iconfont icon-fanhui"></i></div>
					<div className="cartHeaderTitle">
						{this.state.cartHead}
						<span>{this.props.cartList.length}</span>
					</div>
				</header>
				<main className="cartBody">
					<div className="cartempty" style={styleShow}>{this.state.cartEmpty}</div>
					<ul className="cartProList" onClick={this.changeCartPro.bind(this)}>
						{
							this.props.cartList.map( item =>{
								return (
									<li key={item.cart_id}>
										<div className="cartProList_h">
											<div>
												<img src={item.country_img} />
											</div>
											<div>
												<p>从<span className="country">{item.country_name}</span>配送的<span>{item.qty}</span>项商品<span className="freight">预计运费￥0</span></p>
												<p>价格包含关税</p>
											</div>
										</div>
										<div className="cartProlist_b">
											<div className="cartProImg">
												<img src={item.mainImg} />
											</div>
											<div className="cartProInfor">
												<div className="cartInfor_t">
													<h3>{item.title}</h3>
													<h4>商品编号：<span>{item.sku}</span></h4>
													<span className="cartDelete" data-guid={item.cart_id}>&times;</span>
												</div>
												<div className="cartInfor_m">
													<span className="cartQtySel" data-guid={item.cart_id}>数量&nbsp;&nbsp;{item.qty}</span>
													<span className="cartSizeSel" data-guid={item.cart_id}>尺码&nbsp;&nbsp;{item.user_size}</span>
												</div>
											</div>
										</div>
										<div className="cartProFoot">
											<div className="cartToWish">
												<p className="toWishBtn" data-guid={item.id}><i className="iconfont icon-shoucang2"></i>加入愿望单</p>
											</div>
											<div className="cartProPrice">
												<p>￥<span>{item.currentPrice}</span></p>
												<p>（已含关税）</p>
											</div>
										</div>
									</li>
								)
							})
						}
					</ul>
					<div style={styleHide} className="cartHelp">
						<div className="cartHelp_t">
							<p>{this.state.helpTitle}</p>
							<h5>{this.state.helpContent}</h5>
						</div>
						<div className="cartNeedHelp">
							<p>需要帮助？</p>
							<h5>请以如下方式联系我们的客服：</h5>
						</div>
						<div className="cartHelpMethod">
							<span onClick={this.showPhone}><i className="iconfont icon-web-icon-"></i></span>
							<span onClick={this.showEmail}><i className="iconfont icon-icon1"></i></span>
						</div>
					</div>
				</main>
				<footer className="cartFoot">
					<div style={styleHide} className="cartTotalPrice">
						<div className="cartPrice1">
							<p>小计 ￥<span>{this.props.totalPrice()}</span></p>
							<p>配送 ￥<span>{this.props.totalPrice()}</span></p>
						</div>
						<div className="cartPrice2">
							<p>总计 CNY ￥<span>{this.props.totalPrice()}</span></p>
							<p>（已含关税）</p>
						</div>
					</div>
					<div className="cartBtn" onClick={this.toOrder.bind(this)}>{cartBtn}</div>
				</footer>
				{html}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state)
	return {
		cartList:state.cartReducer.cartList.results || [],
		operaResult:state.cartReducer.operaResult,
		status:state.cartReducer.status,
		//总价
		totalPrice:function(){
			let totalP = 0;
			this.cartList.map(function(item){
				totalP += item.currentPrice * item.qty;
			})
			return totalP;
		}
	}
};


export default connect(mapStateToProps, actions)(CartComponent);