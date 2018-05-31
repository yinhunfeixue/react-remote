import React from 'react';
import DemoBase from './DemoBase';
import RadioButton from '../components/RadioButton';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-4 17:20:31
 */
class RadioButtonAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '基本属性';
	}

	rb_changeHandler = (event) => {
		let rb = event.target;
		rb.label = rb.selected ? '已选中：' + rb.value.name : '单选框';
	}

	renderDemo() {
		return (
			<div>
				<h5>创建</h5>
				<RadioButton label='单选' />

				<h5>禁用</h5>
				<RadioButton label='单选' enable={false} />

				<h5>禁用且选中</h5>
				<RadioButton label='单选框' enable={false} selected={true} />

				<h5>携带数据，并获取选中的值</h5>
				<RadioButton label='单选框' value={{ id: 1, name: '我是携带的数据' }} changeHandler={this.rb_changeHandler} />
			</div>
		);
	}
}
export default RadioButtonAttributeDemo;