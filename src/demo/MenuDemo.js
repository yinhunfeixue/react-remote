import React, { Component } from 'react';
import MenuPerformanceDemo from './MenuPerformanceDemo';
import MenuAttributeDemo from './MenuAttributeDemo';
import MenuFunctionDemo from './MenuFunctionDemo';


export default class MenuDemo extends Component {

	render() {
		return (
			<div>
				<MenuAttributeDemo />
				<MenuPerformanceDemo />
				<MenuFunctionDemo />
			</div>
		)
	}
}