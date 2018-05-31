import DemoBase from './DemoBase';
import TreeNodeData from '../core/TreeNodeData';
import Tree from '../components/Tree';
import React from 'react';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-13 09:50:30
 */
class TreeAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {
			menuData: TreeNodeData.createDataByArray([
				{ name: 'aaa', next: [{ name: 'a1' }, { name: 'a2' }] },
				{ name: 'bbb', next: [{ name: 'b1' }, { name: 'b2' }] },
				{ name: 'ccc', next: [{ name: 'c1' }, { name: 'c2' }] }
			], 'name', 'next')
		};
		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<div>
					<h5>创建树，第三项有子节点</h5>
					<Tree data={[new TreeNodeData('aaa'), new TreeNodeData('bbb'), new TreeNodeData('ccc', [new TreeNodeData('c1'), new TreeNodeData('c2')])]}></Tree>


					<h5>创建树，通过标准数组创建</h5>
					<Tree data={
						TreeNodeData.createDataByArray([
							{ value: 'aaa' },
							{ value: 'bbb' },
							{ value: 'ccc', children: [{ value: 'c1' }, { value: 'c2' }] }
						])
					}></Tree>

					<h5>创建树，通过任意数组创建</h5>
					<Tree data={
						TreeNodeData.createDataByArray([
							{ name: 'aaa' },
							{ name: 'bbb' },
							{ name: 'ccc', next: [{ name: 'c1' }, { name: 'c2' }] }
						], 'name', 'next')
					}></Tree>

					<h5>设置选中值</h5>
					<Tree data={this.state.menuData} selectedValue={this.state.menuData[1]}></Tree>
				</div >
			</div>
		);
	}
}
export default TreeAttributeDemo;