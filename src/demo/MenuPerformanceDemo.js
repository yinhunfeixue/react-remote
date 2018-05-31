import DemoBase from './DemoBase';
import Menu from '../components/Menu';
import TreeNodeData from '../core/TreeNodeData';
import React from 'react';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-12 11:29:00
 */
class MenuPerformanceDemo extends DemoBase {
	constructor(props) {
		super(props);

		this.demoName = '性能';

		this.menuCount = 0;

		let data = [];
		for (let i = 0; i < 15; i++) {
			data.push(this.createNode());
		}

		this.state = {
			menuData: data
		}
	}

	createNode() {
		let node = new TreeNodeData('顶级菜单');
		this.menuCount++;
		this.createChildren(node, 10);
		return node;
	}

	createChildren(item, count) {
		let children = [];
		for (let i = 0; i < count; i++) {
			let item = new TreeNodeData('菜单' + i);
			this.menuCount++;
			children.push(item);
		}
		item.children = children;

		for (let i = 0; i < count; i++) {
			let item = children[i];
			if (item.levelIndex < 10 && Math.random() < 0.4) {
				this.createChildren(item, 5);
			}
		}
	}


	labelFunction(data) {
		return data.value;
	}

	renderDemo() {
		return (
			<div>
				
				<h5>高性能菜单，共有{this.menuCount}个菜单项</h5>
				<div>选中：{this.state.selectedValue && this.state.selectedValue.toString()}</div>
				<Menu ref='menu' data={this.state.menuData} labelFunction={this.labelFunction} changeHandler={(event) => {
					this.setState({ selectedValue: event.data.value });
				}} />
			</div>
		);
	}
}
export default MenuPerformanceDemo;