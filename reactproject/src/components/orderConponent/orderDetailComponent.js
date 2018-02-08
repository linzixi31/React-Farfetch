import React, {Component} from 'react';
import {connect} from 'react-redux';
import Back from '../backCompoent/back.js';
import Foot from '../footnavcompoent/footnav.js';
import * as actions from './orderAction.js';

class OrderDetail extends Component{
	state = {
		currentGood:[],
		currentOrder:[],
		orderType:0
	}
	componentWillMount(){
		this.getInfor();
	}
	getInfor(){
		//获取到订单ID
		let orderId = this.props.location.query.orderId;
		this.props.getOrderInformation({currentOrderId:orderId}).then(res=>{
			console.log(res.results)
			if(res){
				this.setState({
					currentGood:res.results.goods,
					currentOrder:res.results.orders[0],
					orderType:res.results.orders[0].order_status
				})
			}
		});
	}
	//改变订单状态
	changeOrderType(){
		let currentType = this.state.orderType;
		let orderId = this.props.location.query.orderId;
		if(currentType == 0){
			console.log('待付款');
			this.props.changeOrderType({orderIds:orderId}).then(res=>{
				if(res.results.affectedRows == 1){
					this.getInfor();
				};
			});
		}else if(currentType == 1){
			console.log('待确认收货');
		}
	}
	render(){
		let html = '';
		if(this.state.currentOrder.order_status == 0){
			html = <div className="orderTypes">
						<div>取消</div>
						<div onClick={this.changeOrderType.bind(this)}>付款</div>
					</div>
		}else if(this.state.currentOrder.order_status == 1){
			html = <div className="orderTypes">
						<div>申请退款</div>
						<div onClick={this.changeOrderType.bind(this)}>确认收货</div>
					</div>
		}else if(this.state.currentOrder.order_status == 2){
			html = <div className="orderTypes">
						<div>申请售后</div>
						<div >去评价</div>
					</div>
		}
		return (
			<div className="orderDetail">
				<Back name={'订单详情'} />
				<div className="orderDetail_main">
					<div className="order_address">
						<p>
							<span>收货人：{this.state.currentOrder.firstname}{this.state.currentOrder.lastname}</span>
							<span className="order_tele">{this.state.currentOrder.tele}</span>
						</p>
						<p>
							<span>收货地址：{this.state.currentOrder.country}{this.state.currentOrder.province}{this.state.currentOrder.city}{this.state.currentOrder.addr_one}{this.state.currentOrder.addr_second}{this.state.currentOrder.addr_third}</span>
						</p>
					</div>
					<div className="order_pro_detail">
						<h5>商品详情</h5>
						{
							this.state.currentGood.map(function(item){
								return (
									<div key={item.id} className="proDetail">
			                            <img src={item.mainImg} />
			                            <div className="proName">
			                            	<p>品名：{item.title}</p>
			                            	<p>SKU：{item.sku}</p>
			                            </div>
			                            <div className="proPrice">
			                            	<p>￥{item.currentPrice}&times;{this.state.currentOrder.qty}</p>
			                            	<p>尺码：{this.state.currentOrder.user_size}</p>
			                            </div>
			                        </div> 
								)
							}.bind(this))
						}
						
					</div>

				</div>
				<div className="orderDetail_footer">
					{html}
                    {<Foot/>}
                </div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {

	}
}

export default connect(mapStateToProps, actions)(OrderDetail);