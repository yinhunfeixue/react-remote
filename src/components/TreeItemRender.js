import TreeItemRenderBase from './supports/TreeItemRenderBase';
import TreeItemRenderSkin from '../skins/TreeItemRenderSkin';

/*
 * 表示Tree组件的一个子项
 * @author: xujunjie 
 * @Date: 2017-09-28 20:12:09 
 * @Last Modified time: 2017-10-09 09:27:09
 */
class TreeItemRender extends TreeItemRenderBase {

	_getDefaultSKinClass() {
		return TreeItemRenderSkin;
	}

	/**
	 * 
	 * 切换开关的元素
	 * 
	 * @readonly
	 * @memberof TreeItemRender
	 */
	get switchControl() {
		return this.findSkinPart('switchControl');
	}

	_initSkin() {
		super._initSkin();
		if (this.switchControl) {
			this.switchControl.onclick = this._switchControlClickHandler;
		}
	}

	_switchControlClickHandler = (event) => {
		this.isOpen = !this.isOpen;
	}
	
}

export default TreeItemRender;