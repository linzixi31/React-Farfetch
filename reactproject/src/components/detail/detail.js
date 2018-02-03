import React,{Component} from 'react';
import http from '../../utils/httpClient.js';
import Spinnercomponent from '../spinner/spinner.js'
import detailScss from './detail.scss'
import { NavBar, Icon,Accordion,Button,WhiteSpace,WingBlank,List} from 'antd-mobile';
import DetailAccordion from './detailAccordion.js';


export default class Detail extends React.Component{
	componentWillMount(){
	}
	state = {
		qty:1
	}
	onChange = (key) => {
    	console.log(key);
  	}
	render(){
		return(
			<div id="detail">
				<header id="header">
					<div>
						<NavBar
		                  mode="light"
		                  icon={<Icon type="left" size="40"/>}
		                  onLeftClick={() => console.log('onLeftClick')}
		                  rightContent={[
		                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
		                    <span key="1" className="qty">{this.state.qty}</span>,
		                    <Icon key="2" type="ellipsis" />,
		                  ]}
		                ></NavBar>
					</div>
				</header>
				<main id="main">
					<div className="mainWrap">
						<div className="mainImg"></div>
						<div className="mainTitle">
							<h3></h3>
							<h4></h4>
							<p></p>
						</div>
						<div className="mainSize"></div>
						<div className="mainMessage">
							<DetailAccordion/>
						</div>
						<div className="mainConnection">
							<div className="connectTop">
								联系我们
							</div>
							<div className="connectionCenter">
								<div>电话</div>
								<i></i>
								<div>电邮地址</div>
							</div>
							<div className="connectionFoot">
								Farfetch特定编号:12178595
							</div>
						</div>
						<div className="mainRecommend">
							<h3>选购这套造型</h3>
						</div>
					</div>
				</main>
				<footer id="footer">
					<Button className="addToCart">加入购物袋</Button><WhiteSpace />
				</footer>
			</div>
			
		)
	}
}
