import React,{Component} from 'react';
import Title from '../titleComponent/titleComponent';
import Footnav from '../footnavcompoent/footnav.js'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import './category.scss'


const tabs= [
{ title: <span>女士</span>, sub: '1' },
{ title: <span>男士</span>, sub: '2' },
{ title: <span>儿童</span>, sub: '3' },
];

const TabExample = () => (
  <div style={{flex:1}}>
    <Tabs tabs={tabs}
      initialPage={1}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        Content of first tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  backgroundColor: '#fff' }}>
        Content of second tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
    <WhiteSpace />
    </div>  
);

export default class CategoryComponent extends Component{
    state={
        titlename:'商品类别'
    }
    render(){
        return(
            <div className='category'>
                <Title name={this.state.titlename}/>
                <TabExample/>
                <Footnav/>
            </div>

            )
    }
  
}