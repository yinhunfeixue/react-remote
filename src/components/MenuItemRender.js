import TreeItemRenderBase from './supports/TreeItemRenderBase';
import MenuItemRenderSkin from '../skins/MenuItemRenderSkin';
import HtmlUtil from '../utils/HtmlUtil';
/*
 * 表示Menu组件的一个子项
 * @author: xujunjie 
 * @Date: 2017-09-28 17:17:33 
 * @Last Modified time: 2017-10-09 09:20:07
 */
class MenuItemRender extends TreeItemRenderBase {

	_adptePosition() {
		if (this.childrenContainer && this.isOpen) {
			this.childrenContainer.style.top = '';
			this.childrenContainer.style.left = '';
			let childrenContainerRectangle = HtmlUtil.getRectangleToWindow(this.childrenContainer);
			let nodeRectangle = HtmlUtil.getRectangleToWindow(this.nodeContainer);

			//如果右侧超出屏幕，则显示在左边
			if (childrenContainerRectangle.right > document.documentElement.clientWidth) {
				this.childrenContainer.style.left = (this.childrenContainer.offsetLeft - childrenContainerRectangle.width - nodeRectangle.width) + 'px';
			}

			//如果底部超出了屏幕，则显示在上方
			if (childrenContainerRectangle.bottom > document.documentElement.clientHeight) {
				this.childrenContainer.style.top = (this.childrenContainer.offsetTop - childrenContainerRectangle.height - nodeRectangle.height) + 'px';
			}
		}
	}
	_initSkin() {
		super._initSkin();
		if (this.nodeContainer) {
			this.rootComponent.onmouseenter = this._nodeContainerMouseEnterHandler;
			this.rootComponent.onmouseout = this._nodeContainerMouseLeaveHandler;
		}
		this._adptePosition();
	}

	_renderChildren() {
		super._renderChildren();
		this._adptePosition();
	}

	_nodeContainerMouseEnterHandler = (event) => {
		this.isOpen = true;
	}

	_nodeContainerMouseLeaveHandler = (event) => {
		if (!this.rootComponent.contains(event.relatedTarget)) {
			this.isOpen = false;
		}
	}

	_getDefaultSKinClass() {
		return MenuItemRenderSkin;
	}
}
export default MenuItemRender;