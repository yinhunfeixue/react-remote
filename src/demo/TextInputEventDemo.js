import DemoBase from './DemoBase';
import TextInput from '../components/TextInput';
import React from 'react';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-25 14:42:03
 */
class TextInputEventDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.demoName = '常用事件';
	}

	renderDemo() {
		return (
			<div>
				<h5>文本改变事件</h5>
				<TextInput
					changeHandler={(event) => {
						event.target.errorText = event.target.text;
					}}
				/>

				<h5>回车事件</h5>
				<TextInput
					enterHandler={(event) => {
						event.target.text = '点击回车';
					}}
				/>

				<h5>焦点获得、失去事件</h5>
				<TextInput
					blurHandler = {(event)=>{
						event.target.text = '失去焦点';
					}

					}
					focusHandler={(event) => {
						event.target.text = '获得焦点';
					}}
				/>
			</div>
		);
	}
}
export default TextInputEventDemo;
