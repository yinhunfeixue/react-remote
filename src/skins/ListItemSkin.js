import React from 'react';
import SkinBase from './SkinBase';
import './less/ListItem.less';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-20 16:37:52
 */
class ListItemSkin extends SkinBase {
	constructor(props) {
		super(props, 'listItem');
	}

	get rootStyle() {
		return {
			display: 'block',
			width: '100%',
		}
	}
	render() {
		return (
			<div className='label' ref='displayLabel'>{this.target.label}</div>
		);
	}
}
export default ListItemSkin;
