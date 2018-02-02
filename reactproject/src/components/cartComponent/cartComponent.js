import React, {Component} from 'react';

import {connect} from 'react-redux';

import * as actions from './cartActions';

class CartComponent extends Component{
	render(){
		return (
			<div className="cart_ly">sdsdsd</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
};


export default connect(mapStateToProps, actions)(CartComponent);