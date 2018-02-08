import React,{Component} from 'react';
import "../css/mui.indexedlist.css";
import * as action from "../../listAction.js";
import {connect} from 'react-redux';
import './listindexed.scss';
import {hashHistory} from 'react-router'
import { NavBar, Icon } from 'antd-mobile';
var valuedata = [];

 class ListIndexedComponent extends Component{
componentDidMount(){
    let selfs = this
    mui.init();
    mui.ready(function() {
        var header = document.querySelector('header.mui-bar');
        var list = document.getElementById('list');
        var done = document.getElementById('done');
        //calc hieght
        list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
        //create
        window.indexedList = new mui.IndexedList(list);
        //done event
        


    });
    function getnewobj(self){
        let newobj = {}
        let newdata = {} 
        newobj = Object.assign({},self.state.data)
        Object.keys(self.state.data).map(function(key){
            self.props.result.map(function(item,idx){

                if(key==item.brand.substr(0, 1)){
                    newobj[key].push(item.brand)
                    newdata[key] = Array.from(new Set(newobj[key]))

                }
            
            })

        })   
        //console.log(newdata)
        return newdata
    }
    let self = this
    if(this.props.location.query.hh=='hh'){
            console.log(66)
            this.props.getBrand().then(res=>{
                let newarr = getnewobj(self)
                this.setState({data:newarr})
            })
    }else {
        let newarr = getnewobj(self)
        this.setState({data:newarr})
        console.log(newarr)
    }
   

          
}

checkbox(item){
    // var list = document.getElementById('#list')
   console.log(666)
   valuedata.push(item)
   var value = valuedata.length ? "搜索(" + valuedata.length + ")" : "搜索";
   this.setState({value:value})
   this.setState({valuedata:valuedata})
   console.log(this.state.valuedata)
}
state={
    value:'搜索',
    valuedata:[],
    data:{
        A:[],
        B:[],
        C:[],
        D:[],
        E:[],
        F:[],
        G:[],
        H:[],
        I:[],
        J:[],
        K:[],
        L:[],
        M:[],
        N:[],
        O:[],
        P:[],
        Q:[],
        R:[],
        S:[],
        T:[],
        U:[],
        V:[],
        W:[],
        X:[],
        Y:[],
        Z:[]
    }
}
render(){
    let self = this
    if(this.state.data.length==0){
        return false
    }
    return(
        <div>
        <header className="mui-bar mui-bar-nav">
            <NavBar
                  key={this.state.value}
                  mode="light"
                  icon={<Icon type='left'/>}
                  onLeftClick={() => hashHistory.goBack()}
                  rightContent={[
                    <span key="1" style={{ fontSize:'0.4rem' }} onClick={()=>{
                        hashHistory.push({
                            pathname:'/brandlist',
                            query:{
                                brand:this.state.valuedata
                            }
                        })
                    }} >完成</span>,
                  ]}
                >{this.state.value}</NavBar>
        </header>
        <div className="mui-content">
            <div id='list' className="mui-indexed-list" style={{height:"auto"}}>
                <div className="mui-indexed-list-search mui-input-row mui-search">
                  
                </div>
                <div className="mui-indexed-list-bar">
                {

                    Object.keys(this.state.data).map(key=>
                         <a key={key}>{key}</a>
                    )
                }
                    
                </div>
                <div className="mui-indexed-list-alert"></div>
                <div className="mui-indexed-list-inner">
                    <div className="mui-indexed-list-empty-alert">没有数据</div>
                    <ul className="mui-table-view">
                        {
                             Object.keys(this.state.data).map(key=>
                            <div>
                                 <li data-group={key} key={key} className="mui-table-view-divider mui-indexed-list-group">
                                 {key}
                                 </li>
                                 {
                                    this.state.data[key].map(function(item,idx){
                                                     
                                        return(
                                            <li key={idx}  data-value={item} data-tags={item} className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left" onClick={()=>{
                                                self.checkbox(item)
                                            }}>
                                                <input type="checkbox"/>{item}
                                            </li>
                                            )

                                    })
                                }
                             </div>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
        </div>

        )
}
}
let mapStateToProps = (state) => {
  console.log(state)
        var arr = state.listReducer.result;
        var hh  = function multiarr(arr){
        for (i=0,len=arr.length;i<len;i++)
        if(arr[i] instanceof Array)return true;
            return false;
        }
        if(!hh){
            return {
                result:state.listReducer.result || [],
            }
        }else{
            return{
                result:[].concat.apply([],arr)
                //把二维数组转化成一维
            }
        }

}

export default connect(mapStateToProps,action)(ListIndexedComponent)

