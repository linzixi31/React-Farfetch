import React from "react";
import TitleComponent from "../titleComponent/titleComponent.js";
import Footnav from "../footnavcompoent/footnav";
import "./wishlist.scss"
import {connect} from "react-redux";
import "./font/iconfont.css"
import { bindActionCreators } from "redux";
import * as action from "./wishlistAction.js"

export class WishListComponent extends React.Component{
    componentWillMount(){
        const userID = localStorage.userId;
        if(userID){
            this.props.checkList({userId:userID});
        }
    }
    componentDidMount(){
    }

    render(){
        const userID = localStorage.userId;
        if(userID){
            return (
                <div id="wishlist">
                    <TitleComponent name="愿望单" />
                    <div className="wishlistMain">
                        {
                            this.props.result.map((item) => {
                                return (<div className="wishProduct" key={item.id}
                                    id={item.id}>
                                    <i className="icon iconfont icon-2guanbi" onClick={this.deletePro.bind(this, item.id)}></i>
                                    <div className="wishImg">
                                        <img src={item.mainImg} />
                                    </div>
                                    <div className="wishDescribe">
                                        <h5>{item.brand}</h5>
                                        <p>￥{item.currentPrice}</p>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                    <Footnav selectedTab='wishlist' />
                </div>
            )
        }else {
            return(
                <div id="wishlist">
                    <TitleComponent name="愿望单" />
                    <div className="wishlistMain">
                        <div className="wishlist_bg">
                            <img src="./src/assets/img/wish_bg.png" />
                        </div>
                        <input type="button" value="立即登录" onClick={this.toLogin.bind(this)}/>
                    </div>
                    <Footnav selectedTab='wishlist' />
                </div>
            )
        }
    }
    
    deletePro(_id){
        const userID = localStorage.userId;
        if(userID){
            this.props.delfromwish({userId:userID,proId:_id});
            var currentPro = document.getElementById(_id);
            currentPro.style.display = "none";
        }
    }
    toLogin(){
        this.props.router.push("/login");
    }
}
let mapToState = (state) =>{
    return{
        result: state.WishlistReducer.result || []
    }
}

export default connect(mapToState, action)(WishListComponent);