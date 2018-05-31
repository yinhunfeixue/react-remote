import React from 'react';
import SkinBase from './SkinBase';
import './less/Picker.less';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-19 19:23:46
 */

class PickerSkin extends SkinBase {
	constructor(props) {
		super(props, 'picker');
	}
	render() {
		return [
			<div key='centerTag' className='centerTag' style={{ height: this.target.itemHeight + 'px' }}></div>,
			<div key='container' className='container' ref='container'></div>,
			<div key='mask' className='mask' style={{ backgroundSize: ('100% ' + (this.target.itemHeight * this.target.displayItemNumber / 2 - this.target.itemHeight / 2) + 'px') }}>
			</div>
		];
	}
}

export default PickerSkin;