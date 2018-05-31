import DemoBase from './DemoBase';
import Tree from '../components/Tree';
import TreeNodeData from '../core/TreeNodeData';
import React from 'react';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-12 11:29:00
 */
class TreePerformanceDemo extends DemoBase {
	constructor(props) {
		super(props);

		this.demoName = '性能';

		this.treeCount = 0;

		let data = [];
		for (let i = 0; i < 15; i++) {
			data.push(this.createNode());
		}

		this.state = {
			treeData: data
		}
	}

	createNode() {
		let node = new TreeNodeData('顶级菜单');
		this.treeCount++;
		this.createChildren(node, 10);
		return node;
	}

	createChildren(item, count) {
		let children = [];
		for (let i = 0; i < count; i++) {
			let item = new TreeNodeData('菜单' + i);
			this.treeCount++;
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

				<h5>高性能树，共有{this.treeCount}个节点</h5>
				<div ref='info'></div>
				<Tree ref='tree' data={this.state.treeData} labelFunction={this.labelFunction} changeHandler={(event) => {
					this.refs.info.innerText = '选中：' + event.data.value.toString();
				}} />
			</div>
		);
	}
}
export default TreePerformanceDemo;