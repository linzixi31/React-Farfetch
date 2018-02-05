import React,{Component} from 'react';
import http from '../../utils/httpClient.js';
import Spinnercomponent from '../spinner/spinner.js'
import detailScss from './detail.scss'
import { NavBar, Icon,Accordion,Button,WhiteSpace,WingBlank,List} from 'antd-mobile';
import {Router, hashHistory} from "react-router";
import DetailAccordion from './detailAccordion.js';
import DetailSize from './detailSize.js'

export default class Detail extends React.Component{
	componentWillMount(){
		if(localStorage.getItem('userid') != ''){
			this.setState({userid:localStorage.getItem('userid')})
		}else{
			this.setState({userid:'游客'})
		}
		//获取当前用户购物车的数量;
		http.get('/getCart',{userId:1}).then(res=>{
			var total = 0;
			res.body.data.results.forEach(function(item){
				total += item.qty*1;
			})
			this.setState({
				cartQty:total
			})
			console.log(total);
		})
		http.get('/getGood',{id:10}).then(res=>{
            this.setState({
            	goods:res.body.data.results[0]
            })
            http.get('/getHotGood').then(result => {
	        	this.setState({
	        		hot:result.body.data.results
	        	})
	        }).catch(err =>{
	        	console.log(err);
	        })
        }).catch(error=>{
            console.log(error)
        })
	}
	state = {
		goods:[],
		hot:[],
		gid:this.props.location.query.id,
		userId:'',
		cartQty:0
	}
	onChange = (key) => {
    	console.log(key);
  	}
	shouCang(e){
		e.target.className = (e.target.className == 'iconfont icon-star__easyico') ? 'iconfont icon-shoucang' : 'iconfont icon-star__easyico';
		if(e.target.className == 'iconfont icon-star__easyico' && this.state.userid != '游客'){
			http.get('/shouCang',{userid:this.state.userid,id:this.state.gid})
		}
	}
	routeToCart(){
		let _size = document.querySelector('.currentSize').innerText;
		if(_size == '选择您的尺寸'){
			alert('请选择您的尺寸')
		}else{
			hashHistory.push({
	            pathname: '/category',
	            query: {
	                id:this.props.location.query.id,
	                size:_size
	            },
	        })
		}
	}
	routeToList(){
		hashHistory.push({
			pathname:'/list'
		})
	}
	render(){
		return(
			<div id="detail">
				<header id="header">
					<div>
						<NavBar
		                  mode="light"
		                  icon={<Icon type="left" size="40"/>}
		                  onLeftClick={() => hashHistory.goBack()}
		                  rightContent={[
		                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
		                    <span key="1" className="qty">{this.state.cartQty}</span>,
		                    <span key="2" className="iconfont icon-baobao"></span>,
		                  ]}
		                ></NavBar>
					</div>
				</header>
				<main id="main">
					<div className="mainWrap">
						<div className="mainImgWrap">
							<i className="iconfont icon-shoucang" onClick={this.shouCang.bind(this)}></i>
							<img className="mainImg" src={this.state.goods.mainImg}/>
						</div>
						<div className="mainTitle">
							<h3>{this.state.goods.brand}</h3>
							<h4>{this.state.goods.title}</h4>
							<p><del>￥10000</del><span className="currentPrice">￥{this.state.goods.currentPrice} </span> <span>该价格已包含关税</span></p>
						</div>
						<div className="mainSize">
							<DetailSize/>
						</div>
						<div className="mainMessage">
							<DetailAccordion descriptions={this.state.goods.descriptions} sku={this.state.goods.sku}/>
						</div>
						<div className="mainConnection">
							<div className="connectTop">
								联系我们
							</div>
							<div className="connectionCenter">
								<div>
									<p><span className="iconfont icon-web-icon- tubiao"></span></p>
									<p>电话</p>
								</div>
								<i></i>
								<div>
									<p><span className="iconfont icon-icon1 tubiao"></span></p>
									<p>电邮地址</p>
								</div>
							</div>
							<div className="connectionFoot">
								Farfetch特定编号:{this.state.goods.sku}
							</div>
						</div>
						<div className="mainRecommend">
							<h3>选购这套造型</h3>
							<ul className="hotGoods">
								{this.state.hot.map(function(item,idx){
									return (
										<li key={idx} data-id={item.id}>
											<div className="hotImg"><img src={item.mainImg}/></div>
											<p className="hotBrand">{item.brand}</p>
											<p className="hotPrice">￥ {item.currentPrice}</p>
										</li>
									)
									
								})}
							</ul>
							<div className="selectAllWrap">
								<Button className="selectAll" onClick={this.routeToList.bind(this)}>选购全部</Button><WhiteSpace />
							</div>
						</div>
					</div>
				</main>
				<footer id="footer">
					<Button className="addToCart" onClick={this.routeToCart.bind(this)}>加入购物袋</Button><WhiteSpace />
				</footer>
			</div>
			
		)
	}
}
