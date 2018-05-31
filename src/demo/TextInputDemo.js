import React, { Component } from 'react';
import TextInputAttributeDemo from './TextInputAttributeDemo';
import TextInputEventDemo from './TextInputEventDemo';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-24 16:28:44
 */
class TextInputDemo extends Component {

	render() {
		return (
			<div>
				<TextInputAttributeDemo />
				<TextInputEventDemo />
			</div>
		);
	}
}
export default TextInputDemo;
