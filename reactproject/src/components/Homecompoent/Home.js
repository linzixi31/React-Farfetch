import React,{Component} from 'react';
import "./base.scss";
import "./index.scss";
import {connect} from "react-redux";
import * as action from "./homeAction.js";
import Carousel from "./carousel.js";
import Footernav from "../footnavcompoent/footnav.js";
import homeScss from './home.scss';
import "../wishListComponent/font/iconfont.css"
import {hashHistory} from "react-router";

export class HomeComponent extends Component {
	componentWillMount(){
		this.props.getHot();
		this.props.getOff();
		this.props.getYsl();
		this.props.getGucci();
		this.props.getOther();
	}
    render(){
        return(
            <div style={{height:"100%"}}>
            	<div id="index">
	            	<div className="index_header">
	            		<h1>Farfetch</h1>
	            		<input type="text" placeholder="搜索"/>
	            	</div>
	            	<div className="index_main">
	            		<div className="tips">
	            			<h3>满人民币3000免邮和全球免费退货</h3>
	            		</div>
	            		<div className="carousel">
	            			<div className="carouselTitle">
	            				<h2>选购首饰</h2>
	            			</div>
	            			<div className="banner">
	            				<Carousel />
	            			</div>
	            		</div>
	            		<div className="specialRecommand">
	            			<div className="recTitle">
	            				<p>为您特别推荐</p>
	            				<span>选购全部</span>
								<i className="iconfont icon-arrow-right-copy"></i>
	            			</div>
	            			<div className="recContent">
	            				{
	            					this.props.result.map((item) =>{
	            						return (<div className="detail" key={item.id}onClick={this.test.bind(this,item.id)}> 
				            					<div className="detail_img">
				            						<img src={item.mainImg} />
				            					</div>
				            					<div className="describe">
				            						<p>{item.brand}</p>
				            						<span>¥{item.currentPrice}</span>
				            					</div>
				            				</div>)
	            					})
	            				}
	            				
	            			</div>
	            		</div>
	            		<div className="maybe">
	           				<h3>您可能会喜欢… …</h3>
	           				<div className="brands">
	           					<div className="brandsTop">
	           						<p>OFF-WHITE</p>
	           						<span>选购全部</span>
									<i className="iconfont icon-arrow-right-copy"></i>
	           					</div>
	           					{
									this.props.offresult.map((item) =>{
										return (<div className="brandContent" key={item.id} onClick={this.test.bind(this, item.id)} >
					           						<div className="brandImg">
					           							<img src={item.mainImg} />
					           						</div>
					           						<div className="brandDescribe">
					           							<p>¥{item.currentPrice}</p>
					           						</div>
					           					</div>)
									})
	           					}
	
	           				</div>
	           				<div className="brands">
	           					<div className="brandsTop">
	           						<p>SAINT LAURENT</p>
	           						<span>选购全部</span>
									<i className="iconfont icon-arrow-right-copy"></i>
	           					</div>
								{
									this.props.yslresult.map((item) =>{
										return (<div className="brandContent" key={item.id} onClick={this.test.bind(this, item.id)}>
					           						<div className="brandImg">
					           							<img src={item.mainImg} />
					           						</div>
					           						<div className="brandDescribe">
					           							<p>¥{item.currentPrice}</p>
					           						</div>
					           					</div>)
									})
								}
	           				</div>
	           				<div className="brands">
	           					<div className="brandsTop">
	           						<p>GUCCI</p>
	           						<span>选购全部</span>
									<i className="iconfont icon-arrow-right-copy"></i>
	           					</div>
	           					{
	           						this.props.gucciresult.map((item) =>{
										return (<div className="brandContent" key={item.id} onClick={this.test.bind(this, item.id)}>
					           						<div className="brandImg">
					           							<img src={item.mainImg} />
					           						</div>
					           						<div className="brandDescribe">
					           							<p>¥{item.currentPrice}</p>
					           						</div>
					           					</div>)
	           						})
	           					}
	           				</div>
	            		</div>
	            		<div className="otherRecommend">
		            		<div className="otherTitle">
		            			<h3>新年"红"运当头</h3>
		            		</div>
							<div className="otherContent">
								{
									this.props.otherresult.map((item) =>{
										return (<div className="otherDetail" key={item.id} onClick={this.test.bind(this, item.id)}>
											<div className="otherImg">
												<img src={item.mainImg} />
											</div>
											<div className="otherMsg">
												<p>{item.brand}</p>
												<p>￥{item.currentPrice}</p>
											</div>
										</div>)
									})
								}
							</div>
							<div className="allItem">
								<input type="button" value='选购全部' />
							</div>
		            	</div>
	            	</div>
	            	<div style={{height:'1.3333rem'}}>
					<Footernav selectedTab='index' />
					</div>
	            </div>
				
            </div>
            )
	}
	test(_id){
		hashHistory.push({
			pathname:"/detail",
			query:{
				proId:_id
			}
		})
	}
} 

let mapToState =  (state) =>{
	return {
		status:state.getHot.status,
		result:state.getHot.result || [],
		offresult:state.getHot.offresult || [],
		yslresult:state.getHot.yslresult ||[],
		gucciresult:state.getHot.gucciresult || [],
		otherresult: state.getHot.otherresult || []
	}
}
export default connect(mapToState,action)(HomeComponent); 