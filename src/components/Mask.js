import UIComponent from './UIComponent';
import React from 'react';
import '../skins/less/Mask.less';
/**
 * 遮罩层
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-21 08:59:39
 * 
 * @extends UIComponent
 */
class Mask extends UIComponent {

	componentDidMount() {
		super.componentDidMount();
	}

	render() {
		return (
			<div className='mask' ref='div'></div>
		);
	}
}

export default Mask;