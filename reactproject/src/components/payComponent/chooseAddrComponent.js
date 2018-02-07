import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as actions from './payActions.js';
import Back from './../backCompoent/back.js';

import './address.scss';

class ChooseAddrComponent extends Component{
	state = {
		currentAdrrId:0
	}
	componentWillMount(){
		//获取路由参数
		var data = this.props.location.query;
		
		this.props.getAddresses().then(res =>{
			res.results.forEach(function(item){
				if(item.defaultAddr == 1){
					document.getElementById(item.addr_id).checked = 'checked';
					this.setState({
						currentAdrrId:item.defaultAddr
					})
				}
			}.bind(this))
			console.log(this.state.currentAdrrId)
		});
	}
	toAddAddress(){
		hashHistory.push({
			pathname:'/addaddr'
		})
	}
	changeDefaultAddr(e){
		let e1 = e.target.parentNode.parentNode.className.toLowerCase();
		let e2 = e.target.tagName.toLowerCase();
		if(e1 === 'chooselist' || e2 === 'p' || e2 == 'input'){
			let currentId = e.target.parentNode.parentNode.getAttribute('data-guid');
			document.getElementById(currentId).checked = 'checked';
			this.setState({
				currentAdrrId:currentId
			})
		}
	}
	changeAddr(){
		let currentId = this.state.currentAdrrId;
		this.props.changeDefault(currentId).then(res =>{
			console.log(res)
			if(res.results.length == 2){
				hashHistory.go(-1);
			}
		});
	}
	//返回
	goBack(){
		hashHistory.go(-1);
	}
	render(){
		return (
			<div className="choose_addr">
				<header className="adr_Header">
					<div className="adr_Back" onClick={this.goBack.bind(this)}><i className="iconfont icon-fanhui"></i></div>
					<div className="adr_HeaderTitle">选择配送地址</div>
				</header>
				<div className="adrList_body">
					<ul onClick={this.changeDefaultAddr.bind(this)}>
						{
							this.props.addresses().map(function(item){
								return (
									<li key={item.addr_id} data-guid={item.addr_id}>
											<div className="chooseRadio">
												<input type="radio" name="address" id={item.addr_id}/>
											</div>
											<div className="chooseList" data-guid={item.addr_id}>
												<p><span>{item.firstname}</span><span>{item.lastname}</span></p>
												<p><span>{item.country}</span><span>{item.province}</span><span>{item.city}</span><span>{item.zipCode}</span></p>
												<p><span>{item.addr_one}{item.addr_second}{item.addr_third}</span></p>
												<p><span>{item.tele}</span></p>
											</div>
											<div className="chooseEdit">
												编辑
											</div>
									</li>
								)
							})		
						}
						<li key="add" className="addNewAddr" onClick={this.toAddAddress.bind(this)}>添加新地址</li>
					</ul>
				</div>
				<footer className="addr_Foot">
					<div className="addr_Btn" onClick={this.changeAddr.bind(this)}>确认并返回</div>
				</footer>
			</div>
		)
	}
}
//addresses:state.payReducer.result == undefined ? [] : state.payReducer.result.results
const mapStateToProps = (state) =>{
	console.log(state)
	return {
		addresses:function(){
			if(state.payReducer.result && !state.payReducer.result.results.affectedRows){
				return state.payReducer.result.results;
			}else{
				return [];
			}
		}
	}
}


export default connect(mapStateToProps, actions)(ChooseAddrComponent);