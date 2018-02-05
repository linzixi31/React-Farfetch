import React, {Component} from 'react';


class SizeQtyComponent extends Component{
	chooseSizeQty(e){
		var sq = document.getElementsByClassName('sizeQty_change')[0];
		var self = e.target;
		if(self.className.toLowerCase() === 'sizeqty_change'){
			sq.style.display = 'none';
			//点击遮罩层时不改变数量和尺码
			this.props.cb('none');
		}else if(self.tagName.toLowerCase() === 'li'){
			//传递尺码数量信息到父组件
			var contect = self.innerText;
			this.props.cb(contect);
			sq.style.display = 'none';
		}
	}
	render(){
		return (
			<div className="sizeQty_change" onClick={this.chooseSizeQty.bind(this)}>
				<div className="sizeQty_content">
					<h3>{this.props.title}</h3>
					<ul>
						{
							this.props.data.split(',').map(function(item){
								return (<li key={item}>{item}</li>)
							})
						}
						
					</ul>
				</div>
			</div>
		)
	}
}

export default SizeQtyComponent;