import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import "./carousel.scss";
import React from "react";

export default class App extends React.Component {
	state = {
		data: ['c0','c1', 'c2', 'c3','c4'],
		imgHeight: 176,
		slideIndex: 0,
	}
	componentDidMount() {
		// simulate img loading
		setTimeout(() => {
			this.setState({
				data: ['c0', 'c1', 'c2','c3','c4'],
			});
		}, 100);
	}
	render() {
		return(

			<Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`./src/assets/img/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
          </Carousel>

		);
	}
}