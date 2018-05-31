import SkinBase from './SkinBase';
import React from 'react';
import './less/MenuItemRender.less';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-30 10:19:40
 */

class MenuItemRenderSkin extends SkinBase {

	get rootStyle() {
		if (this.target.levelIndex === 0) {
			return {
			}
		}
		else {
			return { display: 'block' };
		}
	}

	render() {
		return (
			<span className={'menuItemRender menuItemRender-' + this.status + ' menuItemRender-' + this.target.levelIndex}>
				<span ref='nodeContainer' className={'nodeContainer'}>
					{this.target.label}
					{
						this.target.childrenCount > 0 &&
						<div className='icon' />
					}
				</span>
				<span ref='childrenContainer' className={'childrenContainer'}>

				</span>
			</span>
		);
	}
}

export default MenuItemRenderSkin;