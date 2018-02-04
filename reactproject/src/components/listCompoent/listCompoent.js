import React ,{Component} from "react"
import Backcomponent from '../backCompoent/back.js';
import Footnav from '../footnavcompoent/footnav.js';
import * as action from './listAction.js'
import {connect} from 'react-redux'
import './list.scss'
 class ListComponent extends Component{
     componentWillMount(){
        this.setState({pagename:this.props.location.query.catename});
        console.log(this.props)
        this.props.getDataList({
            catename:this.props.location.query.catename,
            cateId:this.props.location.query.categoryid
        })
     }
     componentDidMount(){
        console.log(this.props)
     }
     state={
        pagename :'上衣'
     }
     render(){
        return(
         <div className="wrap_lzx">
            <Backcomponent name={this.state.pagename}/>
            <div style={{flex:1,overflowX:'hidden'}}>
                <div className="chose_lzx">
                    <ul className="choseBtn">
                        <li><span>筛选</span></li>
                         
                    </ul>                      
                </div>
            </div>
            <Footnav/>
         </div> 

            )
     }
}


let mapStateToProps = (state) => {
  console.log(state)
    return {
        result:state.listReducer.result || []
    }

}

export default connect(mapStateToProps,action)(ListComponent);