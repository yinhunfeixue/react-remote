import React from 'react';
import DemoBase from './DemoBase';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import RadioButtonGroup from '../components/RadioButtonGroup';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-4 17:34:46
 */
class RadioButtonFunctionDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '单选框组';

		this.rbGroup = new RadioButtonGroup();
		this.data = [
			{ id: 1, name: '小王' },
			{ id: 2, name: '小李' },
			{ id: 3, name: '小张' },
			{ id: 4, name: '小胡' },
		];
	}

	btnShow_clickHandler = (event) => {
		alert(this.rbGroup.selectedValue);
	}

	btUnSelect_clickHandler = (event) => {
		this.rbGroup.unSelected();
	}

	renderDemo() {
		return (
			<div>
				<h5>一组单选框的操作</h5>
				{
					this.data.map(value => {
						return <RadioButton key={value.id} label={value.name} value={value.id} group={this.rbGroup} />
					})
				}
				<hr />
				<Button label='显示选中的值' onClick={this.btnShow_clickHandler} />
				<Button label='取消选中' onClick={this.btUnSelect_clickHandler} />
				<div style={{ height: '100px', backgroundColor: '#eeeeee', lineHeight: '100px' }}>
					<RadioButton label='其实，我和上面的属于一个组' value='我不合群' group={this.rbGroup} />
				</div>
			</div>
		);
	}
}
export default RadioButtonFunctionDemo;