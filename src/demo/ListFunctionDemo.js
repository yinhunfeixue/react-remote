import DemoBase from './DemoBase';
import React from 'react';
import List from '../components/List';
import Button from '../components/Button';
import ListItemRender from '../components/ListItemRender';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-11-30 10:26:00
 */
class ListFunctionDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {
			listData: ['aaaaa', 'bbbbbbb', 'cccccc']
		};
		this.demoName = '功能';
	}

	renderDemo() {
		return (
			<div>
				<h5>选中项改变事件</h5>
				<div ref='info1'></div>
				<List data={this.state.listData} changeHandler={(event) => {
					let list = event.currentTarget;
					this.refs.info1.innerText = `选中第${list.selectedIndex},选中的数据为：${list.selectedValue}`;
				}} />

				<h5>自定义文本内容</h5>
				<List data={this.state.listData} labelFunction={(item, index) => {
					return `第${index}项，${item}`;
				}} />

				<h5>取消选中方法一</h5>
				<Button label='先选中列表中的一项，再点我' onClick={event => {
					this.refs.list2.selectedIndex = -1;
				}} />
				<br />
				<List ref='list2' data={this.state.listData} />

				<h5>取消选中方法二</h5>
				<Button label='先选中列表中的一项，再点我' onClick={event => {
					this.refs.list3.selectedValue = null;
				}} />
				<br />
				<List ref='list3' data={this.state.listData} />

				<h5>自定义子项</h5>
				<List ref='list4' data={this.state.listData} itemClassType={CustomeListItemRender} />
			</div>
		);
	}
}
export default ListFunctionDemo;


class CustomeListItemRender extends ListItemRender {
	render() {
		return (
			<div style={{ padding: '10px' }}>
				<img alt='img' style={{ width: '80px', verticalAlign: 'middle' }} src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />
				<span style={{ verticalAlign: 'middle', marginLeft: '20px' }}>{this.data}</span>
				<hr />
			</div>
		);
	}
}