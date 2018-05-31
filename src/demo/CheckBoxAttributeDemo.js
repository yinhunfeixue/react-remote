import React from 'react';
import DemoBase from './DemoBase';
import CheckBox from '../components/CheckBox';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-27 16:00:44
 */
class CheckBoxAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '基本属性';
	}

	cb_changeHandler = (event) => {
		let cb = event.target;
		cb.label = cb.selected ? '已选中：' + cb.value.name : '多选框';
	}
	
	renderDemo() {
		return (
			<div>
				<h5>创建</h5>
				<CheckBox label='多选框' />

				<h5>禁用多选框</h5>
				<CheckBox label='多选框' enable={false} />

				<h5>禁用且选中多选框</h5>
				<CheckBox label='多选框' enable={false} selected={true} />

				<h5>携带数据，并获取选中的值</h5>
				<CheckBox label='多选框' value={{ id: 1, name: '我是携带的数据' }} changeHandler={this.cb_changeHandler} />

			</div>
		);
	}
}
export default CheckBoxAttributeDemo;
