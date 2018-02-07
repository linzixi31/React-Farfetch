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
     componentDidUpdate(){
        //console.log(66)
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
     state={
        pagename :'上衣',
        brand:[],
        starpro:[]
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
                                return  <li key={idx} onClick={()=>{
                                           self.props.getDataBrand({
                                                brand:item
                                           })
                                        }}>
                                            <span>{item}</span>
                                        </li>
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
            <Footnav selectedTab='category'/>
         </div> 

            )
     }
}


let mapStateToProps = (state) => {
  //console.log(state)
    return {
        result:state.listReducer.result || [],
        starresult:state.listReducer.starresult || [],
        setstarresult:state.listReducer.setstarresult || []
    }

}

export default connect(mapStateToProps,action)(ListComponent)