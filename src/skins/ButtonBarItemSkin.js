import SkinBase from './SkinBase';
import React from 'react';
import './less/ButtonBarItem.less';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-1 15:10:04
 */
class ButtonBarItemSkin extends SkinBase {
	constructor(props) {
		super(props, 'buttonBarItem');
	}
	render() {
		return (
			<span>{this.target.label}</span>
		);
	}
}
export default ButtonBarItemSkin;