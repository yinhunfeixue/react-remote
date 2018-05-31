import React from 'react';
import { Component } from 'react';
import ButtonNormalDemo from './ButtonNormalDemo';
import ButtonAutoClickDemo from './ButtonAutoClickDemo';

/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-23 14:46:26
 */
class ButtonDemo extends Component {

	render() {
		return (
			<div>
				<ButtonNormalDemo />
				<ButtonAutoClickDemo />
			</div>
		);
	}
}
export default ButtonDemo;
