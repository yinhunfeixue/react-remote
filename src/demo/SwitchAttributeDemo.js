import React from 'react';
import DemoBase from './DemoBase';
import Switch from '../components/Switch';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-27 10:17:33
 */
class SwitchAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<h5>普通开关</h5>
				<Switch />

				<h5>禁用</h5>
				<Switch enable={false} />

				<h5>禁用且选中</h5>
				<Switch enable={false} selected={true} />
			</div>
		);
	}
}
export default SwitchAttributeDemo;
