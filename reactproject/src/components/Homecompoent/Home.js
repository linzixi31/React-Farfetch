import React,{Component} from 'react';
import '../myComponent/my.scss'

export default class HomeComponent extends Component {
    render(){
        return(
            <div>
                <div>{this.props.children}</div>
            </div>
            )
    }
} 