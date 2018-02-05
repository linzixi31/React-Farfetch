import React from 'react';
import { ActionSheet, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

export default class DataShare extends React.Component {
  	constructor() {
    	super();
    	this.state = {
      		clicked: 'none',
      		clicked1: 'none',
      		clicked2: 'none',
    	};
  	}
	dataList = [
		    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
			{ url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
			{ url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
			{ url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
			{ url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
		].map(obj => ({
			icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title}/>,
	    	title: obj.title,
		}));


		showShareActionSheet = () => {
		    ActionSheet.showShareActionSheetWithOptions({
		      	options: this.dataList,
		      	// title: 'title',
		      	message: '选择操作',
		    },
		    (buttonIndex) => {
		      	this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
		    });
		}

		render() {
		    return (<WingBlank>
		      			<div className="shareWrap" onClick={this.showShareActionSheet}>
			          		<span>分享 </span> <span className="iconfont icon-share shareIcon"></span>
			          	</div>
		      			<WhiteSpace />
		    		</WingBlank>);
		  }
}
