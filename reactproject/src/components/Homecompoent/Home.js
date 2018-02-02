import React,{Component} from 'react';

export default class HomeComponent extends Component {
    render(){
        return(
            <div>
                <div>{this.props.children}</div>
            </div>
            )
    }
} 