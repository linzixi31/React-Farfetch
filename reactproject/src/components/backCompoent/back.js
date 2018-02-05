import React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { hashHistory } from 'react-router';
import '../detail/font/iconfont.css'
import './back.scss'
export default class Back extends Component{

    render(){
        return(
            <div className='back_lzx'>
                <NavBar
                  mode="light"
                  icon={<Icon type='left'/>}
                  onLeftClick={() => hashHistory.goBack()}
                  rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <i className='iconfont icon-baobao'style={{fontSize:'0.506667rem'}}></i>,
                  ]}
                >{this.props.name}</NavBar>

            </div>
            )
    }
  
}