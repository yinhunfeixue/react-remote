import React from 'react';
import SkinBase from './SkinBase';
import './less/ToggleButton.less';

/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/5 下午6:15:25
 */
export default class ToggleButtonSkin extends SkinBase {

	constructor(props) {
		super(props, 'toggleButton')
	}

	render() {
		return (
			<span>{this.target.label}</span>
		);
	}
}