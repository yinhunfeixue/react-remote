/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/8 下午5:11:01
 */
import SkinBase from './SkinBase';
import './less/Switch.less';
import React from 'react';
class SwitchSkin extends SkinBase {
	constructor(props) {
		super(props,
			'switch',
			{
				verticalAlign: 'middle',
			});
	}

	render() {
		return (
			<div className={'switch-fore'}></div>
		);
	}
}

export default SwitchSkin;