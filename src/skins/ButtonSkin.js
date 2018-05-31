/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/1 下午4:22:06
 */
import React from 'react';
import SkinBase from './SkinBase';
import './less/Button.less';

class ButtonSkin extends SkinBase {
	constructor(target) {
		super(target, "button", {display:"inline-flex"});
	}

	render() {
		return (
			<span>{this.target.label}</span>
		);
	}
}
export default ButtonSkin;