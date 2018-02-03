import React,{Component} from 'react';
import Title from '../titleComponent/titleComponent';
import Footnav from '../footnavcompoent/footnav.js'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import './category.scss'
import {connect} from 'react-redux'
import * as action from 'categoryAction.js'


const tabs= [
{ title: <span>女士</span>, sub: '1' },
{ title: <span>男士</span>, sub: '2' },
{ title: <span>儿童</span>, sub: '4' },
];

const TabExample = () => (
  <div>
    <Tabs tabs={tabs}
      initialPage={1}
      onTabClick={(tab, index) => { 
        console.log('onTabClick', index, tab);


       }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        Content of first tab
      </div>
      
    </Tabs>
    <WhiteSpace />
    </div>  
);

 class CategoryComponent extends Component{
    state={
        titlename:'商品类别'
    }
    render(){
        return(
            <div className='category'>
                <Title name={this.state.titlename}/>
                <div style={{flex:1}}><TabExample/></div>
                <Footnav/>
            </div>

            )
    }
  
}

let mapStateToProps = (state) => {
  console.log(state)
    return {
        result:state.category.result,
    }

}

export default connect(mapStateToProps,action)(CategoryComponent);