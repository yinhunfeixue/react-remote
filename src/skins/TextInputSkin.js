import SkinBase from './SkinBase';
import React from 'react';
import './less/TextInput.less';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-13 11:13:58
 */
class TextInputSkin extends SkinBase {

	constructor(props) {
		super(props, 'textInput');
	}
	render() {
		return [
			<input key='input' ref='inputNode' type='text' placeholder={this.target.placeholder} className='input' />,
			this.target.errorText !== null &&
			this.target.errorText.length > 0 &&
			<span key='error' className='error'>{this.target.errorText}</span>
		];
	}
}

export default TextInputSkin;