import React,{Component} from 'react';
<<<<<<< HEAD
import '../myComponent/my.scss';
import '../logincompoent/login.scss';

=======
import homeScss from './home.scss';
>>>>>>> 993d50af509300041eac24075004479ad2fc7865
export default class HomeComponent extends Component {
    render(){
        return(
            <div id="home">
                <div id="pageWrap">{this.props.children}</div>
            </div>
            )
    }
} 