import React ,{Component} from "react";
import { SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';
import './search.scss';
import Back from '../backCompoent/back.js'
export default class SearchComponent extends Component{
    componentDidMount() {
    }
    onChange= (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    state={
        value:"",
    }
    render(){
        return(
            <div id='search_lzx'>
              <Back name='搜索页'/>
              <SearchBar placeholder="搜索" maxLength={8} showCancelButton />
              <WhiteSpace />
            </div>
            )
    }

}