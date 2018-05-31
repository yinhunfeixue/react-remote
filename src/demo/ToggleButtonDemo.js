import React, { Component } from 'react';
import ToggleButtonAttributeDemo from './ToggleButtonAttributeDemo';
import ToggleButtonEventDemo from './ToggleButtonEventDemo';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-27 09:59:55
 */
class ToggleButtonDemo extends Component {

	render() {
		return (
			<div>
				<ToggleButtonAttributeDemo />
				<ToggleButtonEventDemo />
			</div>
		);
	}
}
export default ToggleButtonDemo;
