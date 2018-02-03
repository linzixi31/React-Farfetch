import React ,{Component} from "react"
import Backcomponent from '../backCompoent/back.js';
import Footnav from '../footnavcompoent/footnav.js';
import './list.scss'
export default class ListComponent extends Component{
     state={
        pagename :'上衣'
     }
     render(){
        return(
         <div className="wrap_lzx">
            <Backcomponent name={this.state.pagename}/>
            <div style={{flex:1,overflowX:'hidden'}}>
            </div>
            <Footnav/>
         </div> 

            )
     }
}