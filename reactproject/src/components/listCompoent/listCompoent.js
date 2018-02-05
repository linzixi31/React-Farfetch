import React ,{Component} from "react"
import Backcomponent from '../backCompoent/back.js';
import Footnav from '../footnavcompoent/footnav.js'
export default class ListComponent extends Component{
     state={
        pagename :'上衣'
     }
     render(){
        return(
         <div>
            <Backcomponent name={this.state.pagename}/>
            <Footnav/>
         </div> 

            )
     }
}