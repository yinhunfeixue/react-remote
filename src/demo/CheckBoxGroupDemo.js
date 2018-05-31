import React from 'react';
import DemoBase from './DemoBase';
import CheckBox from '../components/CheckBox';
import CheckBoxGroup from '../components/CheckBoxGroup';
import Button from '../components/Button';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-27 17:35:30
 */
class CheckBoxGroupDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '多选框组';

		this.cbGroup = new CheckBoxGroup();
		this.data = [
			{ id: 1, name: '小王' },
			{ id: 2, name: '小李' },
			{ id: 3, name: '小张' },
			{ id: 4, name: '小胡' },
		];
	}

	btnShow_clickHandler = (event) => {
		alert(this.cbGroup.selectedValues);
	}

	btnSelectAll_clickHandler = (event) => {
		this.cbGroup.selectedAll();
	}

	btnUnSelectAll_clickHandler = (event) => {
		this.cbGroup.unselectedAll();
	}

	renderDemo() {
		return (
			<div>
				<h5>一组多选框的操作</h5>
				{
					this.data.map(value => {
						return <CheckBox key={value.id} label={value.name} value={value.id} group={this.cbGroup} />
					})
				}
				<hr />
				<Button label='显示选中的值' onClick={this.btnShow_clickHandler} />
				<Button label='全选' onClick={this.btnSelectAll_clickHandler} />
				<Button label='全不选' onClick={this.btnUnSelectAll_clickHandler} />
				<div style={{ height: '100px', backgroundColor: '#eeeeee', lineHeight: '100px' }}>
					<CheckBox label='其实，我和上面的属于一个组' value='我不合群' group={this.cbGroup} />
				</div>
			</div>
		);
	}
}
export default CheckBoxGroupDemo;
