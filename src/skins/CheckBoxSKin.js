/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/5 下午6:53:38
 */
import React from 'react';
import SkinBase from './SkinBase';
import './less/CheckBox.less';
export default class CheckBoxSkin extends SkinBase {
	constructor(props) {
		super(props, 'checkBox');
	}

	render() {
		return [
			<div key='point' className={'checkBox-point'}>
				<div className={'checkBox-point-inner'} />
			</div>,
			<span key='label' className='checkBox-label'>{this.target.label}</span>
		];
	}
}