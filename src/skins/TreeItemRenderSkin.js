import SkinBase from './SkinBase';
import React from 'react';
import './less/TreeItemRender.less';
/*
 * @author: xujunjie 
 * @Date: 2017-09-28 20:27:51 
 * @Last Modified time: 2017-10-09 09:27:43
 */
class TreeItemRenderSkin extends SkinBase {
	get rootStyle() {
		return {
			display: 'block'
		};
	}

	constructor(props) {
		super(props, 'treeItemRender');
	}

	render() {
		let result = [];
		result.push(
			<div className='nodeContainer' key='nodeContainer'>
				{
					this.target.childrenCount > 0 &&
					<img ref='switchControl' className='treeItemIcon' alt='' src={this.target.isOpen ? require('./icon/sub.svg') : require('./icon/add.svg')} />
				}
				<span className='treeItemLabel' ref='nodeContainer'>{this.target.label}</span >
			</div>
		);

		if (this.target.childrenCount > 0) {
			result.push(<div key='childrenContainer' ref='childrenContainer' className='childrenContainer' />);
		}
		return result;
	}
}

export default TreeItemRenderSkin;