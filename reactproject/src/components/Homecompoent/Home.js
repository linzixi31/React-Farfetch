import React,{Component} from 'react';
import '../myComponent/my.scss';
import '../logincompoent/login.scss';

export default class HomeComponent extends Component {
    render(){
        return(
            <div>
                <div>{this.props.children}</div>
            </div>
            )
    }
} 