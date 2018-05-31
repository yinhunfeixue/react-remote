import React, { Component } from 'react';
import TreeAttributeDemo from './TreeAttributeDemo';
import TreePerformanceDemo from './TreePerformanceDemo';
import TreeFunctionDemo from './TreeFunctionDemo';

class TreeDemo extends Component {

	render() {
		return (
			<div>
				<TreeAttributeDemo />
				<TreePerformanceDemo />
				<TreeFunctionDemo />
			</div>
		)
	}
}


export default TreeDemo;
