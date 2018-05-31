import React from 'react';
import DemoBase from './DemoBase';
import ToggleButton from '../components/ToggleButton';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-27 13:07:43
 */
class ToggleButtonEventDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '常用事件';
	}

	toggleButton_changeHandler = (event) => {
		event.target.label = '选中状态：' + event.target.selected;
	}

	renderDemo() {
		return (
			<div>
				<h5>选中状态切换事件</h5>
				<ToggleButton changeHandler={this.toggleButton_changeHandler} />
			</div>
		);
	}
}
export default ToggleButtonEventDemo;
