import React from 'react';
import DemoBase from './DemoBase';
import ProgressBar from '../components/ProgressBar';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-20 11:56:53
 */
class ProgressBarAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<h5>创建</h5>
				<ProgressBar />

				<h5>设置当前值</h5>
				<ProgressBar value={30} />

				<h5>设置最大，当前值</h5>
				<ProgressBar value={100} maxValue={200} />

				<h5>禁用</h5>
				<ProgressBar value={100} maxValue={200} enable={false} />

				<h5>自定义显示文字</h5>
				<ProgressBar value={100} maxValue={200} labelFunction={(value, maxValue) => {
					return '自定义文字：' + value + '/' + maxValue;
				}} />
			</div>
		);
	}
}
export default ProgressBarAttributeDemo;