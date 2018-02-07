import React ,{Component} from "react";
import { SearchBar, WhiteSpace, WingBlank,List } from 'antd-mobile';
import './search.scss';
import Back from '../backCompoent/back.js'
import * as action from './searchAtion.js'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
const Item = List.Item;
const Brief = Item.Brief;
class SearchComponent extends Component{
    componentDidMount() {
         this.manualFocusInst.focus();
    }
    onChange= (value) => {
        console.log(value)
        this.setState({ value });
        this.props.getSearchData({
            value:value
        })
    };
    onSubmit=(value) => {
        console.log(value)
    }
    clear = () => {
        this.setState({ value: '' });
    };
    state={
        value:"",
    }
    renderSearch(){
        if(this.props.result){
            return(
                this.props.result.map(function(item,idx){
                    return <Item  key={idx} arrow="horizontal"
                        onClick={()=>{
                            hashHistory.push({
                                pathname:'/detail',
                                query:{
                                    proId:item.id
                                }
                            })
                        }}
                    >{item.title}</Item>
                })

            )
        }else{
            return false
        }
        
    }
    render(){
        let self = this
        return(
            <div id='search_lzx'>
              <Back name='搜索页'/>
              <SearchBar placeholder="搜索" maxLength={8}  ref={ref => this.manualFocusInst = ref}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
               />
              <WhiteSpace />
              {self.renderSearch()}
            </div>
            )
    }

}

let mapStateToProps = (state) => {
  console.log(state)
    return {
        result:state.searchReducer.result || [],
        
    }

}

export default connect(mapStateToProps,action)(SearchComponent)