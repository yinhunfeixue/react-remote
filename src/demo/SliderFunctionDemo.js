import DemoBase from './DemoBase';
import HSlider from '../components/HSlider';
import React from 'react';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-11-29 11:05:17
 */
class SliderFunctionDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.demoName = '功能';
	}

	renderDemo() {
		return (
			<div>
				<h5>获取滑块值</h5>
				<span ref='info1'></span>
				<br/>
				<HSlider changeHandler={(event) => {
					let slider = event.target;
					this.refs.info1.innerText =`最大值${slider.maxValue}, 最小值${slider.minValue}，当前值${slider.value}`;
				}} />
			</div>
		);
	}
}
export default SliderFunctionDemo;