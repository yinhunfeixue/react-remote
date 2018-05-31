import SkinBase from './SkinBase';
import React from 'react';
import './less/ButtonBar.less';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-1 15:19:38
 */
class ButtonBarSkin extends SkinBase {
	constructor(props) {
		super(props, 'buttonBar');
	}
	render() {
		return (
			<div ref='container'></div>
		);
	}
}
export default ButtonBarSkin;