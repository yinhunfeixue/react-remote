
import React from 'react';
import DemoBase from './DemoBase';
import List from '../components/List';
/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-11-30 09:23:24
 */
class ListAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {
			listData: ['aaaaa', 'bbbbbbb', 'cccccc']
		};
		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>

				<h5>设置数据源</h5>
				<List data={this.state.listData} />

				<h5>设置默认选中值</h5>
				<List data={this.state.listData} selectedValue={'aaaaa'} />

				<h5>设置默认选中序号</h5>
				<List data={this.state.listData} selectedIndex={2} />

				<h5>不允许选中</h5>
				<List data={this.state.listData} selectedAble={false} />

				<h5>禁用</h5>
				<List data={this.state.listData} enable={false} />
			</div>
		);
	}
}
export default ListAttributeDemo;