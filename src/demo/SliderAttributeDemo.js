import React from 'react';
import DemoBase from './DemoBase';
import HSlider from '../components/HSlider';
import VSlider from '../components/VSlider';

class SliderAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<h5>水平滑块</h5>
				<HSlider />

				<h5>竖直滑块</h5>
				<VSlider />

				<h5>设置当前值</h5>
				<HSlider value={50} />

				<h5>设置最大值、最小值、当前值</h5>
				<HSlider minValue={0} maxValue={200} value={50} />

				<h5>设置步进值</h5>
				<HSlider stepSize={20} />

				<h5>禁用</h5>
				<HSlider enable={false} />
			</div>
		);
	}

}
export default SliderAttributeDemo;