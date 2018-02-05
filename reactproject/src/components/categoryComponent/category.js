import React,{Component} from 'react';
import Title from '../titleComponent/titleComponent';
import Footnav from '../footnavcompoent/footnav.js'
import { Tabs, WhiteSpace, List } from 'antd-mobile';
import './category.scss'
import {connect} from 'react-redux'
import * as action from './categoryAction.js'
import {hashHistory} from 'react-router'
const Item = List.Item;
const Brief = Item.Brief;
const tabs= [
{ title: <span>女士</span>, sub: '2' },
{ title: <span>男士</span>, sub: '1' },
{ title: <span>儿童</span>, sub: '4' },
];


class CategoryComponent extends Component{
    componentWillMount(){
        this.props.getData({tab:'2'})
    }
    state={
        titlename:'商品类别'
    }
    getData(event){

        this.props.getData({tab:event.sub})
    }
    render(){

        return(
            <div className='category'>
                <Title name={this.state.titlename}/>
                <div style={{flex:1}}>
                    <div>
                        <Tabs tabs={tabs} initialPage={0} onChange={this.getData.bind(this)}>
                           <List  className="my-list" >
                            {
                                this.props.result.map(function(item,index){
                                 return  <Item  key={index} arrow="horizontal" onClick={(e) => {
                                    //console.log(e)
                                    hashHistory.push({
                                        pathname: '/list',
                                        query: {
                                            catename:item.category_name,
                                            categoryid:item.cate_id
                                        },
                                    })
                                 }}
                                 >{item.category_name}</Item>
                                })
                            }
                            </List>
                        </Tabs>
                        <WhiteSpace />
                    </div>  
                </div>
                <Footnav/>
            </div>

            )
    }
  
} 

let mapStateToProps = (state) => {
  //console.log(state)
    return {
        result:state.cateReducer.result || []
    }

}

export default connect(mapStateToProps,action)(CategoryComponent);