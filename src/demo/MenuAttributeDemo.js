import DemoBase from './DemoBase';
import React from 'react';
import Menu from '../components/Menu';
import TreeNodeData from '../core/TreeNodeData';


/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-12 14:25:56
 */
class MenuAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {
			menuData: TreeNodeData.createDataByArray([
				{ name: 'aaa' },
				{ name: 'bbb' },
				{ name: 'ccc', next: [{ name: 'c1' }, { name: 'c2' }] }
			], 'name', 'next')
		};
		this.demoName = '基本属性';

	}
	renderDemo() {
		return (
			<div>
				<h5>创建菜单，第三项有子菜单</h5>
				<Menu data={[new TreeNodeData('aaa'), new TreeNodeData('bbb'), new TreeNodeData('ccc', [new TreeNodeData('c1'), new TreeNodeData('c2')])]}></Menu>


				<h5>创建菜单，通过标准数组创建</h5>
				<Menu data={
					TreeNodeData.createDataByArray([
						{ value: 'aaa' },
						{ value: 'bbb' },
						{ value: 'ccc', children: [{ value: 'c1' }, { value: 'c2' }] }
					])
				}></Menu>

				<h5>创建菜单，通过任意数组创建</h5>
				<Menu data={
					TreeNodeData.createDataByArray([
						{ name: 'aaa' },
						{ name: 'bbb' },
						{ name: 'ccc', next: [{ name: 'c1' }, { name: 'c2' }] }
					], 'name', 'next')
				}></Menu>

				<h5>设置默认选中值</h5>
				<Menu data={this.state.menuData} selectedValue={this.state.menuData[1]}></Menu>
			</div >
		);
	}
}
export default MenuAttributeDemo;