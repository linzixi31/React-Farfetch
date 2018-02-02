import React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './back.scss'
export default class Back extends Component{

    render(){
        return(
            <div className='back_lzx'>
                <NavBar
                  mode="light"
                  icon={<Icon type="left" />}
                  onLeftClick={() => console.log('onLeftClick')}
                  rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                  ]}
                >{this.props.name}</NavBar>

            </div>
            )
    }
  
}