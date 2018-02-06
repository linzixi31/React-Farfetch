import React, {Component} from 'react';

import * as actions from './payActions';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import './address.scss';

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
		if(e.target.tagName.toLowerCase() == 'input'){
			let currentType = e.target.getAttribute('id');
			let currentText = e.target.value;
			if(currentText != ''){
				document.getElementById(currentType).nextSibling.innerText = 'x';
			}else if(currentText == ''){
				document.getElementById(currentType).nextSibling.innerText = '*';
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
			this.props.addAddress(this.state).then(res =>{
				console.log(res)
				if(res.results.affectedRows){
					hashHistory.go(-1);
				}
			});
		}
		/*else if(num < 8){
			for(var attr in this.state){
				if(this.state[attr] == '' && attr != 'addr_second' && attr != 'addr_third'){
					console.log(attr)
					document.getElementById(attr).className = 'error';
				}
			}
		}*/
	}
	//返回
	goBack(){
		hashHistory.go(-1);
	}
	render(){
		return (
			<div className="addAddress">
				<header className="adr_Header">
					<div className="adr_Back" onClick={this.goBack}>&lt;</div>
					<div className="adr_HeaderTitle">添加配送地址</div>
				</header>
				<main className="add_addr_body">
					<p className="add_attention">*为必填</p>
					<ul className="addr_infor" onChange={this.getInfor.bind(this)} onClick={this.boldLine.bind(this)}>
						<li>
							<input type="text" placeholder="名字" id="lastname"/>
							<i>*</i>
						</li>
						<li>
							<input type="text" placeholder="姓氏"  id="firstname"/>
							<i>*</i>
						</li>
						<li>
							<input type="text" placeholder="国家/地区" id="country"/>
							<i>&gt;</i>
						</li>
						<li>
							<input type="text" placeholder="省/直辖市"  id="province"/>
							<i>&gt;</i>
						</li>
						<li>
							<input type="text" placeholder="城市" id="city"/>
							<i>*</i>
						</li>
						<li>
							<input type="text" placeholder="地址(第一行)"  id="addr_one"/>
							<i>*</i>
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
							<i>*</i>
						</li>
						<li>
							<input type="text" placeholder="电话"  id="tele"/>
							<i>*</i>
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