import TitleWindow from '../components/TitleWindow';
import React from 'react';
import DemoBase from './DemoBase';
import RadioButton from '../components/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroup';
import DataEvent from '../events/DataEvent';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-15 11:33:52
 */
class TitleWindowFunctionDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '常用功能';
		this.rb = new RadioButtonGroup();
		this.rb.addEventListener(DataEvent.DATA_CHANGED, this.rbg_changeHandler);
	}

	rbg_changeHandler = (event) => {
		let data = event.data;
		let window = this.refs.window;
		switch (data) {
			case '最大化':
				window.max();
				break;
			case '最小化':
				window.min()
				break;
			default:
				window.normal();
				break;
		}
	}

	renderDemo() {
		return (
			<div>
				{
					['普通', '最大化', '最小化'].map((value, index) => {
						return <RadioButton key={index} label={value} value={value} group={this.rb} />
					})
				}
				<br />
				<TitleWindow ref='window' closeHandler={(event)=>{
					console.log(event);
				}}>
					aaaaaaa
					<br />
					bbbbbbb
				</TitleWindow>
			</div>
		);
	}
}
export default TitleWindowFunctionDemo;