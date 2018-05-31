import React, { Component } from 'react';
import TitleWindowAttributeDemo from './TitleWindowAttributeDemo';
import TitleWindowFunctionDemo from './TitleWindowFunctionDemo';
/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-15 10:48:54
 */
class TitleWindowDemo extends Component {
	render() {
		return (
			<div>
				<TitleWindowAttributeDemo />
				<TitleWindowFunctionDemo />
			</div>
		);
	}
}
export default TitleWindowDemo;