import React,{Component} from 'react';
import http from '../../utils/httpClient.js';
import Spinnercomponent from '../spinner/spinner.js'
import detailScss from './detail.scss'
import { NavBar, Icon,Accordion,Button,WhiteSpace,WingBlank,List} from 'antd-mobile';
import {Router, hashHistory} from "react-router";
import DetailAccordion from './detailAccordion.js';
import DetailSize from './detailSize.js';
import DetailModal from './detailModal.js';
import DetailEmailModal from './detailEmailModal.js'
export default class Detail extends React.Component{
	//进入页面前
	componentWillMount(){
		var currentProId;
		var currentUserId;
		//判断进入时是否有商品，没有则进行默认操作；
		if(this.props.location.query.proId){
			currentProId = this.props.location.query.proId;
		}else{
			currentProId = 100;
		}
		this.setState({proId:currentProId});
		//判断当前登录状态
		if(localStorage.userid != ''){
			this.setState({userId:localStorage.getItem('userid')})
			currentUserId = localStorage.userid;
			//获取当前用户购物车的数量;
		http.get('/getCart',{userId:currentUserId}).then(res=>{
			var total = 0;
			res.body.data.results.forEach(function(item){
				total += item.qty*1;
			})
			this.setState({
				cartQty:total
			})
		})
		//获取当前商品是否有被收藏;
		http.get('/checkShouCang',{userId:currentUserId,proId:currentProId}).then(rest=>{
			console.log(rest.body.type,currentUserId,currentProId)
			this.setState({shouCang : (rest.body.type == 1) ? 'iconfont icon-shoucang' : 'iconfont icon-shoucang1'})
		})
		//获取当前产品信息
		http.get('/getGood',{id:currentProId}).then(res=>{
			console.log(res);
            this.setState({
            	goods:res.body.data.results[0],
            	size:res.body.data.results[0].size.split(',')
            })
            http.get('/getHotGood',{category:res.body.data.results[0].category}).then(result => {
	        	this.setState({
	        		hot:result.body.data.results
	        	})
	        }).catch(err =>{
	        	console.log(err);
	        })
        }).catch(error=>{
            console.log(error)
        })
        
		}else{
			this.setState({userid:'游客'});
			currentUserId = '游客’';
		}
	}
	
	
	//操作部分
	routeToCart(){
		//跳转并加入购物车
		let _size = document.querySelector('.currentSize').innerText;
		if(_size == '选择您的尺寸'){
			alert('请选择您的尺寸')
		}else{
			if(this.state.userId != '游客'){
				http.get('/saveCart',{userId:this.state.userId,proId:this.state.proId,user_size:_size,qty:1}).then(res =>{
					console.log(res);
				})
				hashHistory.push({
		            pathname: '/cart',
		        })
			}
		}
	}
	straightRouteToCar(){
		hashHistory.push({
            pathname: '/category',
        })
	}
	onChange = (key) => {
    	console.log(key);
  	}
	shouCang(e){
		console.log(this.state.proId)
		//改变收藏状态并改变收藏数据
		if(this.state.userid != '游客'){
			http.get('/shouCang',{userId:this.state.userId,proId:this.state.proId,type:1}).then(res =>{
				console.log(res);
			})
			e.target.className = (e.target.className == 'iconfont icon-shoucang') ? 'iconfont icon-shoucang1' : 'iconfont icon-shoucang';
		}else{
			//没有登录时的操作
//			http.get('/deleteShouCang',{userId:1,proId:10}).then(res)=>{
//			}
		}
	}
	ceshi(_id){
		//获取商品
		http.get('/getGood',{id:_id}).then(res=>{
            this.setState({
            	goods:res.body.data.results[0],
            	size:res.body.data.results[0].size.split(','),
            	proId:_id
            })
        	http.get('/checkShouCang',{userId:this.state.userId,proId:_id}).then(rest=>{
        		console.log(_id);
				this.setState({shouCang : (rest.body.type == 1) ? 'iconfont icon-shoucang' : 'iconfont icon-shoucang1'})
			})
	        .catch(err =>{
	        	console.log(err);
	        })
        }).catch(error=>{
            console.log(error)
        })
	}
	componentWillUpdate(){
		document.getElementById('main').scrollTop = 0;
	}
	routeToList(){
		hashHistory.push({
			pathname:'/list'
		})
	}
	state = {
		goods:[],
		hot:[],
		size:[],
		proId:'',
		userId:'',
		cartQty:0,
		shouCang:0
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
		                    <span key="2" className="iconfont icon-baobao cartBao" onClick={this.straightRouteToCar}></span>,
		                  ]}
		                ></NavBar>
					</div>
				</header>
				<main id="main">
					<div className="mainWrap">
						<div className="mainImgWrap">
							<i className={this.state.shouCang} onClick={this.shouCang.bind(this)}></i>
							<img className="mainImg" src={this.state.goods.mainImg}/>
						</div>
						<div className="mainTitle">
							<h3>{this.state.goods.brand}</h3>
							<h4>{this.state.goods.title}</h4>
							<p><del>￥100000</del><span className="currentPrice">￥{this.state.goods.currentPrice} </span> <span>该价格已包含关税</span></p>
						</div>
						<div className="mainSize">
							<DetailSize size={this.state.size}/>
						</div>
						<div className="mainMessage">
							<DetailAccordion brand={this.state.goods.brand} descriptions={this.state.goods.descriptions} sku={this.state.goods.sku}/>
						</div>
						<div className="mainConnection">
							<div className="connectTop">
								联系我们
							</div>
							<div className="connectionCenter">
								<DetailModal/>
								<i></i>
								<DetailEmailModal/>
							</div>
							<div className="connectionFoot">
								Farfetch特定编号:{this.state.goods.sku}
							</div>
						</div>
						<div className="mainRecommend">
							<h3>选购这套造型</h3>
							<ul className="hotGoods">
								{this.state.hot.map((item,idx)=>{
									return (
										<li key={idx} data-id={item.id} onClick={this.ceshi.bind(this,item.id)}>
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
