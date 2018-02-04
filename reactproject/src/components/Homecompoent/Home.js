import React,{Component} from 'react';
import homeScss from './home.scss';
export default class HomeComponent extends Component {
    render(){
        return(
            <div id="home">
                <div id="pageWrap">{this.props.children}</div>
            </div>
            )
    }
} 