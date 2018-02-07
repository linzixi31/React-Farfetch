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

export default class DetailEmailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false
    };
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
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
        
        <WhiteSpace />
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="电邮地址"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div>
			电邮地址:291760155@qq.com
          </div>
        </Modal>
      </WingBlank>
    );
  }
}