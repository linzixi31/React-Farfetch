import React from "react";
import TitleComponent from "../titleComponent/titleComponent.js";
import Footnav from "../footnavcompoent/footnav";
// import "./wishlist.scss"

export default class WishListComponent extends React.Component{
    render(){
        return(
            <div id="wishlist">
                <TitleComponent name="愿望单" />
                <Footnav />
            </div>
        )
    }
}