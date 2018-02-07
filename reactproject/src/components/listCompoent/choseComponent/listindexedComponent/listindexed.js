import React,{Component} from 'react';
import "../css/mui.indexedlist.css";
import * as action from "../../listAction.js";
import {connect} from 'react-redux';
import './listindexed.scss';
import {hashHistory} from 'react-router'
 class ListIndexedComponent extends Component{
componentDidMount(){
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
        done.addEventListener('tap', function() {
            var checkboxArray = [].slice.call(list.querySelectorAll('input[type="checkbox"]'));
            var checkedValues = [];
            checkboxArray.forEach(function(box) {
                if (box.checked) {
                    checkedValues.push(box.parentNode.innerText);
                }
            });
            if (checkedValues.length > 0) {
                mui.alert('你选择了: ' + checkedValues);
            } else {
                mui.alert('你没选择任何机场');
            }
        }, false);
        mui('.mui-indexed-list-inner').on('change', 'input', function() {
            var count = list.querySelectorAll('input[type="checkbox"]:checked').length;
            var value = count ? "完成(" + count + ")" : "完成";
            done.innerHTML = value;
            if (count) {
                if (done.classList.contains("mui-disabled")) {
                    done.classList.remove("mui-disabled");
                }
            } else {
                if (!done.classList.contains("mui-disabled")) {
                    done.classList.add("mui-disabled");
                }
            }
        });
    });
    console.log(this.props)
        let self = this
        //这地方要注意
        let newarr = {}
        console.log(this.state.data)
         newarr = Object.assign({},self.state.data)
        Object.keys(this.state.data).map(function(key){
            self.props.result.map(function(item,idx){

                if(key==item.brand.substr(0, 1)){

                    console.log(key)
                    newarr[key].push(item.brand)
                }
            
            })

        })   
        this.setState({data:newarr})
        console.log(newarr)  
}
state={
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
    if(this.state.data.length==0){
        return false
    }
    return(
        <div>
        <header className="mui-bar mui-bar-nav">
            <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" onClick={
               ()=> hashHistory.goBack()
            }></a>
            <h1 className="mui-title">选择品牌</h1>
            <a id='done' className="mui-btn mui-btn-link mui-pull-right mui-btn-blue mui-disabled">完成</a>
        </header>
        <div className="mui-content">
            <div id='list' className="mui-indexed-list" style={{height:"auto"}}>
                <div className="mui-indexed-list-search mui-input-row mui-search">
                    <input type="search" className="mui-input-clear mui-indexed-list-search-input" placeholder="搜索品牌"/>
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
                                            <li key={idx}  data-value={item} data-tags={item} className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
                                                <input type="checkbox" />{item}
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
    return {
        result:state.listReducer.result || [],
    }

}

export default connect(mapStateToProps,action)(ListIndexedComponent)

