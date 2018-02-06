import React ,{Component} from "react";
import Backcomponent from '../backCompoent/back.js';
import Footnav from '../footnavcompoent/footnav.js';
import * as action from './listAction.js'
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import './font/iconfont.css'
import './list.scss'
 class ListComponent extends Component{
     componentWillMount(){
        this.setState({pagename:this.props.location.query.catename});
        if(!this.props.location.query.value){
            this.props.getDataList({
                catename:this.props.location.query.catename,
                cateId:this.props.location.query.categoryid
            }).then(res=>{
                var newarr = [];
                this.props.result.map(function(item,idx){
                        if(!newarr.includes(item.brand)){
                            newarr.push(item.brand)
                        }
                })
                this.setState({brand:newarr})
            })
        }else if(this.props.location.query.value){
            this.props.getchoseData({
                catename:this.props.location.query.catename,
                cateId:this.props.location.query.categoryid
            },this.props.location.query.value).then(res=>{
                var newarr = [];
                this.props.result.map(function(item,idx){
                        if(!newarr.includes(item.brand)){
                            newarr.push(item.brand)
                        }
                })
                this.setState({brand:newarr})
            })
        }
     }
     componentDidUpdate(){
        console.log(66)
     }
     listaction(e,item){
        //console.log(e.target)
        let target = e.target
        if(target.tagName.toLowerCase()==='i'){
            if(target.className==='iconfont icon-shoucang'){
                // console.log(localstorage)
                target.classList.add("active_list_lzx");
            }else if(target.className==='iconfont icon-shoucang active_list_lzx'){
                target.classList.remove("active_list_lzx");
            }
        }
        if(e.target.tagName.toLowerCase()==='li' || e.target.tagName.toLowerCase()==='img'){
            hashHistory.push({
                pathname:'/detail',
                query: {
                    proId:item.id
                }
            })
        }
     }
     state={
        pagename :'上衣',
        brand:[]
     }

     render(){
        let self = this;
      
        return(
         <div className="wrap_lzx">
            <Backcomponent name={this.state.pagename} />
            <div style={{flex:1,overflowX:'hidden'}}>
                <div className="chose_lzx">
                    <ul className="choseBtn">
                        <li onClick={()=>{
                            hashHistory.push({
                                pathname:'/chose',
                                query:{
                                    listname:this.props.location.query.catename,
                                    categoryid:this.props.location.query.categoryid
                                }
                            })
                        }}><span>筛选</span></li>
                         {
                            this.state.brand.map(function(item,idx){
                                return <li key={idx} onClick={()=>{
                                   self.props.getDataBrand({
                                        brand:item
                                   })
                                }}><span>{item}</span></li>
                            })
                        }
                    </ul>                      
                </div>
                <div className='list_main_lzx'>
                    <div className="text_lzx">
                            <p>满人民币3500免邮和全球免费退货</p>
                    </div>
                    <ul className="list_cont">
                        { 
                            this.props.result.map(function(item,idx){
                                return<li key={idx} onClick={(e)=>{
                                            self.listaction(e,item)
                                            }}>
                                            <div className='start_list' >
                                                <i  className="iconfont icon-shoucang" ></i>
                                            </div> 
                                            <img  src={item.mainImg}/>
                                            <p className='title'>{item.title}</p>
                                            <p className='price'>￥{item.currentPrice}</p>
                                      </li>
                            })                        
                        }
                    </ul>
                </div>
            </div>
            <Footnav selectedTab='category'/>
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

export default connect(mapStateToProps,action)(ListComponent)