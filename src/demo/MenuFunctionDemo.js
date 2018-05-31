import DemoBase from './DemoBase';
import React from 'react';
import Menu from '../components/Menu';
import TreeNodeData from '../core/TreeNodeData';
import Alert from '../components/Alert';
import Button from '../components/Button';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-12 15:23:36
 */
class MenuFunctionDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {
			menuData: TreeNodeData.createDataByArray([
				{ name: 'aaa' },
				{ name: 'bbb' },
				{ name: 'ccc', next: [{ name: 'c1' }, { name: 'c2' }] }
			], 'name', 'next')
		};
		this.demoName = '常用功能';
	}

	renderDemo() {
		return (
			<div>
				<h5>在选中改变事件中，获取选中的值</h5>
				<Menu data={this.state.menuData} changeHandler={(event) => {
					Alert.show('当前选中的值：', event.data.value);
				}} />

				<h5>在任意位置，获取选中的值</h5>
				<Button label='点击获取选中值' onClick={(event) => {
					let data = this.refs.menu2.selectedValue;
					if (data) {
						Alert.show('当前选中值', data.value);
					}
					else {
						Alert.show('未选中任何菜单');
					}

				}} />
				<br />
				<Menu ref='menu2' data={this.state.menuData} />


				<h5>自定义显示文字</h5>
				<Menu data={this.state.menuData} labelFunction={(data) => {
					return data.value + '我是自定义的文字';
				}} />
			</div>
		);
	}
}
export default MenuFunctionDemo;