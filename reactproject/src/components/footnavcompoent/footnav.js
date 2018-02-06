import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router'
import { TabBar } from 'antd-mobile';
import * as action from './footAction.js'
import {connect} from 'redux';
import './footnav.scss'
export default class Footnav extends Component {
componentDidMount(){
  if(this.props.selectedTab){
    this.setState({selectedTab:this.props.selectedTab})

  }else{
    return
  }
}
constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      hidden: false,
      fullScreen: true,
    };
  }
  
   render() {
    return (


    
      <div style={{height:'1.333333rem'}}>
        <TabBar
          unselectedTintColor="#AAAAAA"
          tintColor="#222"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          
          <TabBar.Item
            icon={{ uri: './src/components/footnavcompoent/img/index2.svg' }}
            selectedIcon={{ uri: './src/components/footnavcompoent/img/index1.svg' }}
            title="首页"
            key="index"
            selected={this.state.selectedTab === 'index'}
            onPress={() => {
              this.setState({
                selectedTab: 'index',
              });
              hashHistory.push({
                pathname:'/index'
              })
            }}
          >
          
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: './src/components/footnavcompoent/img/shop2.svg' }}
            selectedIcon={{ uri: './src/components/footnavcompoent/img/shop1.svg' }}
            title="商品类别"
            key="category"
            selected={this.state.selectedTab === 'category'}
            onPress={() => {
              this.setState({
                selectedTab: 'category',
              });
              hashHistory.push({
                pathname:'/category'
              })
            }}
          >
          
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: './src/components/footnavcompoent/img/brand2.svg' }}
            selectedIcon={{ uri: './src/components/footnavcompoent/img/brand1.svg' }}
            title="品牌"
            key="brand"
            selected={this.state.selectedTab === 'brand'}
            onPress={() => {
              this.setState({
                selectedTab: 'brand',
              });
              hashHistory.push({
                pathname:'/brand'
              })
            }}
          >
          
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: './src/components/footnavcompoent/img/star2.svg' }}
            selectedIcon={{ uri: './src/components/footnavcompoent/img/star1.svg' }}
            title="愿望单"
            key="wishlist"
            selected={this.state.selectedTab === 'wishlist'}
            onPress={() => {
              this.setState({
                selectedTab: 'wishlist',
              });
              hashHistory.push({
                pathname:'/wishlist'
              })
            }}
          >
          
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: './src/components/footnavcompoent/img/my2.svg' }}
            selectedIcon={{ uri: './src/components/footnavcompoent/img/my1.svg' }}
            title="我的帐户"
            key="my"
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
              hashHistory.push({
                pathname:'/my'
              })
            }}
          >
          
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
// let mapStateToProps = (state) => {
//   console.log(state)
//     return {
//         result:state.listReducer.result || [],
//     }

// }

// export default connect(mapStateToProps,action)(Footnav);