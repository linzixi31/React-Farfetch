import React from "react";
import TitleComponent from "../titleComponent/titleComponent.js";
import Footnav from "../footnavcompoent/footnav";
import "./wishlist.scss"
import {connect} from "react-redux";
import "./font/iconfont.css"

export default class WishListComponent extends React.Component{
    componentWillMount(){

    }
    render(){
        return(
            <div id="wishlist">
                <TitleComponent name="愿望单" />
                <div className="wishlistMain">
                    <div className="wishProduct">
                        <i className="iconfont icon-buoumaotubiao20"></i>
                        <div className="wishImg">
                            <img />
                        </div>
                        <div className="wishDescribe">
                            <h5>GABRIELA HEARST</h5>
                            <p>￥25,478</p>
                        </div>
                    </div>
                </div>
                <Footnav />
            </div>
        )
    }
    toList(){
        this.props.router.push("/list");
    }
}
let mapToState = (state) =>{
    return{}
}