import React,{Component} from 'react';
import http from '../../utils/httpClient.js';
import FootNav from '../footnavcompoent/footnav.js';
import BackComponent from '../backCompoent/back.js';
import { Tabs, WhiteSpace, List } from 'antd-mobile';
import {Router, hashHistory} from "react-router";
import * as actions from './redux/brandActions.js'
import {connect} from 'react-redux';
import brandScss from './brand.scss';

const Item = List.Item;
const Brief = Item.Brief;
const tabs= [
{ title: <span>女士</span>, sub: '0' },
{ title: <span>男士</span>, sub: '1' },
{ title: <span>儿童</span>, sub: '2' },
];


class BrandComponent extends React.Component{
	componentWillMount(){
        this.props.getBrandData({tab:'2'})
        console.log(666);
        console.log(this.props);
   }
	state={
		pagename:'上衣'
	}
	routeToSearch(){
		hashHistory.push({
			pathname:'/listindexed',
		})
	}
	getBrandData(event){
		this.props.getBrandData({tab:event.sub});
	}
	render(){
		console.log(this.props.result)
		return(
			<div id="brand">
				<BackComponent name="品牌页"/>
				<div id="brandMain">
                    <Tabs tabs={tabs} initialPage={0} onChange={this.getBrandData.bind(this)}>
                       <div>
                       		<div className="BrandTop" onClick={this.routeToSearch.bind(this)}>
                       			<p>
                       				探索品牌名称<span>A-Z ></span>
                       			</p>
                       			<p>
                       				Fendi,Balenciaga,Miu Miu与2000多个设计师品牌
                       			</p>
                       		</div>
                       		<div className="BrandButtom">
                       			<h3>人气设计师品牌</h3>
                       			<ul>
                       				{
                       					this.props.result.map(function(item,idx){
                       						return <li key={idx} data-id={item.brandId} onClick={(e)=>{
                       							hashHistory.push({
                       								pathname:'/brandlist',
                       								query:{
                       									brand:item.brand
                       								},
                       							})
                       						}}>
                       							<div>
                       								<img src={item.brandImg}/>
                       							</div>
                       							<h4>{item.brand}</h4>
                       							<p>选购全部</p>
                       						</li>
                       					})
                       				}
                       			</ul>
                       		</div>
                       </div>
                    </Tabs>
                    <WhiteSpace />
                </div> 
				<FootNav selectedTab ='brand'/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
        result:state.brandReducer.result || []
    }
}

export default connect(mapStateToProps, actions)(BrandComponent);

