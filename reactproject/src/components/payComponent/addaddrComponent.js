import React, {Component} from 'react';

import * as actions from './payActions';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import './address.scss';
import {Toast} from 'antd-mobile';

class AddressComponent extends Component{
	state = {
		lastname:'',
		firstname:'',
		country:'',
		province:'',
		city:'',
		addr_one:'',
		zipCode:'',
		tele:''
	}
	boldLine(e){
		// if(e.target.tagName.toLowerCase() == 'input'){

		// }
	}
	//保存用户的输入信息到state
	getInfor(e){
		let currentType = e.target.getAttribute('id');

		if(e.target.tagName.toLowerCase() == 'input' && currentType != 'addr_second' && currentType != 'addr_third'){
			let currentText = e.target.value;
			if(currentText != ''){
				document.getElementById(currentType).nextSibling.className = 'iconfont icon-zhengquequeding';
			}else if(currentText == ''){
				document.getElementById(currentType).nextSibling.className = 'iconfont icon-shibai';
			}
			this.setState({[currentType]:currentText});
		}
	}
	//将用户收货地址信息写入到数据库
	addAddress(){
		//判断必填信息是否完整
		let num = 0;
		for(var attr in this.state){
			if(this.state[attr] != '' && attr != 'addr_second' && attr != 'addr_third'){
				num ++;
			}
		}
		if(num == 8){
			let userId = window.localStorage.userId;
			console.log(userId,this.state)
			this.props.addAddress(userId,JSON.stringify(this.state)).then(res =>{
				console.log(res)
				if(res.results[1].affectedRows){
					hashHistory.go(-1);
				}
			});
			
		}
		else if(num < 8){
			 Toast.fail('信息不完整', 1);

			/*for(var attr in this.state){
				if(this.state[attr] == '' && attr != 'addr_second' && attr != 'addr_third'){
					console.log(attr)
					document.getElementById(attr).className = 'error';
				}
			}*/
		}
	}
	//返回
	goBack(){
		hashHistory.go(-1);
	}
	render(){
		return (
			<div className="addAddress">
				<header className="adr_Header">
					<div className="adr_Back" onClick={this.goBack}><i className="iconfont icon-fanhui"></i></div>
					<div className="adr_HeaderTitle">添加配送地址</div>
				</header>
				<main className="add_addr_body">
					<p className="add_attention">*为必填</p>
					<ul className="addr_infor" onChange={this.getInfor.bind(this)} onClick={this.boldLine.bind(this)}>
						<li>
							<input type="text" placeholder="名字" id="lastname"/>
							<i className="iconfont icon-shibai"></i>
						</li>
						<li>
							<input type="text" placeholder="姓氏"  id="firstname"/>
							<i className="iconfont icon-shibai"></i>
						</li>
						<li>
							<input type="text" placeholder="国家/地区" id="country"/>
							<i className="iconfont icon-shibai"></i>
						</li>
						<li>
							<input type="text" placeholder="省/直辖市"  id="province"/>
							<i className="iconfont icon-shibai"></i>
						</li>
						<li>
							<input type="text" placeholder="城市" id="city"/>
							<i className="iconfont icon-shibai"></i>
						</li>
						<li>
							<input type="text" placeholder="地址(第一行)"  id="addr_one"/>
							<i className="iconfont icon-shibai"></i>
						</li>
						<li>
							<input type="text" placeholder="地址(第二行)" id="addr_second"/>
							<i></i>
						</li>
						<li>
							<input type="text" placeholder="地址(第三行)"  id="addr_third"/>
							<i></i>
						</li>
						<li>
							<input type="text" placeholder="邮编" id="zipCode"/>
							<i className="iconfont icon-shibai"></i>
						</li>
						<li>
							<input type="text" placeholder="电话"  id="tele"/>
							<i className="iconfont icon-shibai"></i>
						</li>
					</ul>
				</main>
				<footer className="addr_Foot">
					<div className="addr_Btn" onClick={this.addAddress.bind(this)}>保存并继续</div>
				</footer>
			</div>
		)
	}
}

const mapStateToProps = (state) =>{

	return {

	}
}

export default connect(mapStateToProps, actions)(AddressComponent);