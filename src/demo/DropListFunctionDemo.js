import DemoBase from './DemoBase';
import React from 'react';
import DropList from '../components/DropList';
import Button from '../components/Button';
import Alert from '../components/Alert';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-4 11:53:37
 */
class DropListFunctionDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {
			data: [{ id: 1, label: 'aaa' }, { id: 2, label: 'bbb' }, { id: 3, label: 'ccc' }]
		};
		this.demoName = '常用功能';
	}

	labelFunction(data) {
		return data.label;
	}

	renderDemo() {
		return (
			<div>
				<h5>自定义数据显示函数</h5>
				<DropList placeholder='请选择' data={this.state.data} labelFunction={this.labelFunction} />

				<h5>选中项改变事件</h5>
				<div ref='info1'></div>
				<DropList placeholder='请选择' selectedIndex={-1} data={this.state.data} labelFunction={this.labelFunction} changeHandler={event => {
					let target = event.currentTarget;
					this.refs.info1.innerText = `选中第${target.selectedIndex}项，id=${target.selectedValue.id}, label=${target.selectedValue.label}`;
					this.forceUpdate();
				}} />

				<h5>自定义搜索函数</h5>
				<div>只搜索id，所以请输入id值，而不是显示的值</div>
				<DropList placeholder='请输入数据项的id值' data={this.state.data} labelFunction={this.labelFunction}
					searchAble={true}
					searchFunction={(value, key) => {
						return value.id.toString() === key;
					}} />


				<h5>自定义添加数据项</h5>
				<div>请输入一个字符串，然后点击回车</div>
				<DropList ref='dlAdd' placeholder='请输入数据项的id值' data={this.state.data} labelFunction={this.labelFunction}
					inputAble={true}
					newValueFunction={(text) => {
						return { id: text, label: text };
					}} />
					
				<Button label='显示所有数据' onClick={(event) => {
					Alert.show('所有数据',
						<div>
							{
								this.refs.dlAdd.data.map((value) => { return <p>id={value.id} label={value.label}</p> })
							}
						</div>
					);
				}} />
			</div>
		);
	}
}
export default DropListFunctionDemo;