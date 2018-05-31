import React from 'react';
import TextInput from '../components/TextInput';
import DemoBase from './DemoBase';
import Switch from '../components/Switch';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-23 17:21:05
 */
class TextInputAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<h5>基本文本框</h5>
				<div ref='info'></div>
				<TextInput placeholder='获取输入内容' enterHandler={(event) => {
					this.refs.info.innerHTML = event.target.text;
				}} />

				<h5>显示为密码</h5>
				<TextInput placeholder='错误提示' displayAsPassword="true" errorText='输入错误' />

				<h5>错误提示</h5>
				<TextInput placeholder='错误提示' errorText='输入错误' />

				<h5>允许输入指定字符</h5>
				<TextInput placeholder='只能输入数字、小写字母' restrict='0-9a-z' />

				<h5>禁止输入指定字符</h5>
				<TextInput placeholder='禁止输入数字' restrict='^0-9' />

				<h5>限制字符数量</h5>
				<TextInput placeholder='最多输入10个字符' maxChars={10} />

				<h5>不可编辑</h5>
				<TextInput placeholder='最多输入10个字符' maxChars={10} editable={false} text='我不能修改' />

				<h5>禁用</h5>
				<TextInput ref='tbEnable' enable={false} text='放我出来，点右边的开关' />
				<Switch changeHandler={(event) => {
					this.refs.tbEnable.enable = event.target.selected;
				}} />
			</div>
		);
	}
}
export default TextInputAttributeDemo;
