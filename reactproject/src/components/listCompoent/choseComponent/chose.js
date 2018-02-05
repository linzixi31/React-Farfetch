import React ,{Component} from 'react';
import { hashHistory } from 'react-router'
import { Tabs, WhiteSpace, List,NavBar,Icon,Checkbox,Radio,Button} from 'antd-mobile';
import * as action from './choseAction.js';
import {connect} from 'react-redux';
const Item = List.Item;
const RadioItem = Radio.RadioItem;
const Brief = Item.Brief;
import './chose.scss'

 class ChoseComponent extends Component{
    state = {
    value: 0,
  
  };
  onChange = (value) => {
    console.log('checkbox'+value);

    this.setState({
      value,
    });
  };
  submit(){
    console.log(this.state)
    let catename = this.props.location.query.listname
    let categoryid = this.props.location.query.categoryid
    
    hashHistory.push({
                pathname:'/list',
                query:{
                    catename,                    
                    categoryid,
                    value:this.state.value
                }
            })

  }
    render(){
        const data = [
      { value: 0, label: '编辑精选' },
      { value: 1, label: '新近商品' }, 
      { value: 2, label: '价格（从高到低）' },
      { value: 3, label: '价格（从低到高）' },
    ];
        const { value, value2, value3, value4 } = this.state;
        let self = this
        return(
            <div id="chose_lzx">
                <NavBar
                  mode="light"
                  icon={<Icon type="left" />}
                  onLeftClick={() => hashHistory.goBack()}
                  rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                  ]}
                >筛选</NavBar>
               <List renderHeader={() => '分类'}>
                {data.map(i => (
                  <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                    {i.label}
                  </RadioItem>
                ))}
              </List>
              <List renderHeader={() => '筛选'}>
                <Item  arrow="horizontal" onClick={(e) => {}}>商品分类</Item>
                <Item  arrow="horizontal" onClick={(e) => {}}>品牌</Item>
                <Item  arrow="horizontal" onClick={(e) => {}}>颜色</Item>
                <Item  arrow="horizontal" onClick={(e) => {}}>价格范围</Item>
              </List>
              <Button onClick={()=>{
                self.submit()
              }}>显示81笔结果</Button>
            </div>

            )
    }
}
let mapStateToProps = (state) => {
  console.log(state)
    return {
        result:state.listReducer.result || [],
    }

}

export default connect(mapStateToProps,action)(ChoseComponent);