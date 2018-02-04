import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

export default class DetailSize extends React.Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      	modal2: false,
    	};
  	}
  	showModal = key => (e) => {
	    e.preventDefault(); // 修复 Android 上点击穿透
	    this.setState({
	      	[key]: true,
	    });
	}
  	onClose = key => (e) => {
  		var size = e.target.innerText;
  		var currentSize = document.querySelector('.currentSize');
  		if(e.target.className == 'detail-am-list-item'){
  			currentSize.innerText = size;
  		}
    	this.setState({
      	[key]: false,
    	});
  	}
  	onWrapTouchStart = (e) => {
    	// fix touch to scroll background page on iOS
    	if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      	return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      	e.preventDefault();
    	}
  	}
  	
  	render() {
    return (
    	<WingBlank>
        	<div className="SizeBtn" onClick={this.showModal('modal2')}>
				<span className="currentSize">选择您的尺寸</span>
			</div>
	        <WhiteSpace />
	        <Modal
	          	popup
	          	visible={this.state.modal2}
	          	onClose={this.onClose('modal2')}
	          	animationType="slide-up"
	        >
	        <ul render={
	        	() => <div>选择你的尺寸</div>
	        	} className="popup-list sizeList"
	        	>
	        	<li className="sizeTop">选择尺码:均码</li>
	            {['L', 'XL', 'XXL'].map((i, index) => (
	              	<li key={index} onClick={this.onClose('modal2')} className="detail-am-list-item">{i}</li>
	            ))}
	        </ul>
	        </Modal>
      	</WingBlank>
    );
  }
}
