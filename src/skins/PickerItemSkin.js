import SkinBase from './SkinBase';
import React from 'react';
import './less/PickItem.less';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-19 14:34:29
 */
class PickerItemSkin extends SkinBase {

	get rootStyle() {
		return { width:'100%'};
	}

	render() {
		return (
			<div className='pickItem'>{this.target.label}</div>
		);
	}
}

export default PickerItemSkin;