import React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {hashHistory} from "react-router"  
export default class Back extends Component{

    render(){
        return(
            <div className='back_lzx'>
                <NavBar
                  mode="light"
                  rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={()=>{
                      hashHistory.push({pathname:"/search"});
                      }}/>,
                    <i key="2" className='iconfont icon-baobao'style={{fontSize:'0.506667rem'}}
                    onClick={()=>{
                      hashHistory.push({pathname:"/cart"});
                    }}
                    ></i>,
                  ]}
                >{this.props.name}</NavBar>
            </div>
            )
    }
  
}