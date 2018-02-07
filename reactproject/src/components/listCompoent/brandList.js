import React ,{Component} from "react";
import Backcomponent from '../backCompoent/back.js';
import Footnav from '../footnavcompoent/footnav.js';
import * as action from './listAction.js'
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import './font/iconfont.css'
import './list.scss'


class BrandListComponent extends Component{
     state={
        starpro:[]
     }
     componentWillMount(){
        if(this.props.location.query.brand){
            this.props.getbrandListData({
                brand:this.props.location.query.brand
            })
        }else{
            this.props.getbrandListData({
                brand:'Fendi'
            })
        }
        this.props.getstarData({
          userId:window.localStorage.userId
        }).then(res=>{
            var newarr = []
            res.results.forEach(function(item,idx){
                newarr.push(item.proId)
            })
            //console.log(newarr)
            this.setState({starpro:newarr})
            //console.log(this.state.starpro)
        })
     }
     listaction(e,item){
        //console.log(e.target)
        let target = e.target
        
        if(target.tagName.toLowerCase()==='i' && window.localStorage.username){
            if(target.className==='iconfont icon-shoucang'){
                // console.log(localstorage)
                this.props.setstarData({
                    userId:window.localStorage.userId,
                    proId:item.id,
                    type:1
                }).then(res=>{
                    if(res.results.affectedRows==1){
                        target.setAttribute('class',"iconfont icon-shoucang2");
                    }
                    
                })
                
                
            }else if(target.className==='iconfont icon-shoucang2'){
                this.props.setstarData({
                    userId:window.localStorage.userId,
                    proId:item.id,
                    type:0
                }).then(res=>{
                    
                        target.setAttribute('class',"iconfont icon-shoucang");
                    
                })

            }
        }else if(e.target.tagName.toLowerCase()==='li' || e.target.tagName.toLowerCase()==='img'){
            hashHistory.push({
                pathname:'/detail',
                query: {
                    proId:item.id
                }
            })
        }else{
             layer.open({
                content: '您请先登录吧？'
                ,btn: ['登录', '取消']
                ,yes: function(index){
                  hashHistory.push({
                    pathname:'/login'

                  })
                  layer.close(index);
                }
              });
        }
     }
     renderstar(item){
            if(this.state.starpro.includes(item.id))
            {
            return(
                <i  className="iconfont icon-shoucang2" ></i>
                )

            }else{
            return(
                <i  className="iconfont icon-shoucang" ></i>
                )
            }
      }
     renderNewshop(item){
            if(item.newest==1){
                return(
                    <p className="newest">新类</p>
                    )
            }else{
                return(

                    <div className='jian'></div>
                    )
            }
     }
     render(){
        let self = this
        return(
            <div  className="wrap_lzx">
                <Backcomponent name={this.props.location.query.brand} />
                <div style={{flex:1,overflowX:"hidden"}}>
                     <div className='list_main_lzx'>
                            <div className="text_lzx">
                                    <p>满人民币3500免邮和全球免费退货</p>
                            </div>
                            <ul className="list_cont">
                            {
                                this.props.brandlistresult.map(function(item,idx){
                                    return<li key={idx} onClick={(e)=>{
                                                    self.listaction(e,item)
                                                    }}>
                                                    <div className='start_list' >
                                                        {self.renderstar(item)}
                                                    </div> 
                                                    <img  src={item.mainImg}/>
                                                    {self.renderNewshop(item)}
                                                    <p className='title'>{item.title}</p>
                                                    <p className='price'>￥{item.currentPrice}</p>
                                           </li>
                                })
                            }
                            </ul>
                    </div>
                </div>

                <Footnav selectedTab='brand'/>
            </div>
        )
     }

}

let mapStateToProps = (state) => {
  console.log(state)
    return {
        brandlistresult:state.listReducer.result || [],
    }

}

export default connect(mapStateToProps,action)(BrandListComponent);