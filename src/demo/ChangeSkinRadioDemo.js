import React from 'react';
import RadioButton from '../components/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroup';
import DemoBase from './DemoBase';
import SkinBase from '../skins/SkinBase';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-7 14:19:43
 */
class ChangeSkinRadioDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '单选按钮换肤';

		this.rbGroup = new RadioButtonGroup();
	}

	renderDemo() {
		return (
			<div>
				<h5>默认单选按钮样式</h5>
				{
					['a', 'b', 'c', 'd', 'e'].map(((value) => {
						return <RadioButton key={value} label={value} value={value} group={this.rbGroup} />
					}))
				}
				<br />

				<h5>自定义皮肤，除了外观不同，其它的功能完全一致</h5>
				{
					['a', 'b', 'c', 'd', 'e'].map(((value) => {
						return <RadioButton key={value} label={value} value={value} group={this.rbGroup} skinClass={NewSkin} />
					}))
				}
			</div>
		);
	}
}

class NewSkin extends SkinBase {
	constructor(props) {
		super(props, 'myRaido');
	}
	render() {
		return (
			<div style={{ width: '100px', height: '100px', padding: '15px', backgroundColor: (this.target.selected ? 'red' : '#aa2222') }}>
				<span>{this.target.label}</span>
			</div>
		);
	}
}
export default ChangeSkinRadioDemo;