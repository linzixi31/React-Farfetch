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
                  key={this.props.name}
                  mode="light"
                  icon={<Icon type='left'/>}
                  onLeftClick={() => hashHistory.goBack()}
                  rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={()=>{
                      hashHistory.push({pathname:"/search"});
                      }
                    }/>,
                    <i key="1" className='iconfont icon-baobao'style={{fontSize:'0.506667rem'}} 
                    onClick={()=>{
                      hashHistory.push({pathname:"/cart"});
                      }}></i>
                  ]}
                >{this.props.name}</NavBar>

            </div>
            )
    }
  
}