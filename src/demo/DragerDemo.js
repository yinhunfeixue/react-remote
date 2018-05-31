import React, { Component } from 'react';
import DragerNormalDemo from './DragerNormalDemo';
import DragerRelevanceDemo from './DragerRelevanceDemo';
import DragerEventDemo from './DragerEventDemo';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-14 13:23:56
 */
class DragerDemo extends Component {
	render() {
		return (
			<div>
				<DragerNormalDemo />
				<DragerRelevanceDemo />
				<DragerEventDemo />
			</div>
		);
	}
}
export default DragerDemo;