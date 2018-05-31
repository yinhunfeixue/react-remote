import React from 'react'
import DemoBase from './DemoBase';
import ToggleButton from '../components/ToggleButton';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-27 10:00:14
 */
class ToggleButtonAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.demoName = '基本属性';
		this.state = {};
	}
	renderDemo() {
		return (
			<div>
				<h5>普通切换按钮</h5>
				<ToggleButton label='普通切换按钮' />

				<h5>禁用</h5>
				<ToggleButton label='普通切换按钮' enable={false} />

				<h5>禁用且选中</h5>
				<ToggleButton label='普通切换按钮' enable={false} selected={true} />
			</div>
		);
	}
}
export default ToggleButtonAttributeDemo;
