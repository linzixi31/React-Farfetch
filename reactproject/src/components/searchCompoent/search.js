import React ,{Component} from "react";
import { SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';
import './search.scss';
export default class SearchComponent extends Component{
    componentDidMount() {
    }
    onChange= (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    
    render(){
        return(
            <div id='search_lzx'>
              <SearchBar placeholder="搜索" maxLength={8} showCancelButton />

              <WhiteSpace />
            </div>
            )
    }

}