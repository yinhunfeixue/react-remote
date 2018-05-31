import React from 'react';
import DropList from '../components/DropList';
import DemoBase from './DemoBase';

/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-24 17:16:53
 */
class DropListAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {
			data: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'bb', 'cc', 'dd']
		};
		this.demoName = '基本属性';

	}

	renderDemo() {
		return (
			<div>
				<h5>设置数据源</h5>
				<DropList placeholder='请选择' data={this.state.data}/>

				<h5>启用搜索功能（使用默认搜索函数）</h5>
				<DropList placeholder='输入文字可过滤下拉列表' data={this.state.data} searchAble={true} />

				<h5>启用回车添加数据功能（使用默认添加函数）</h5>
				<DropList placeholder='输入文字，按回车' data={this.state.data} inputAble={true} />

				<h5>启用可搜索且可添加数据</h5>
				<div ref='info'></div>
				<DropList placeholder='请选择' data={this.state.data} inputAble={true} searchAble={true} changeHandler={event => {
					this.refs.info.innerText = event.currentTarget.selectedValue;
				}} />

				<h5>禁用</h5>
				<DropList placeholder='已禁用' enable={false} data={this.state.data} />
			</div>
		);
	}
}
export default DropListAttributeDemo;
