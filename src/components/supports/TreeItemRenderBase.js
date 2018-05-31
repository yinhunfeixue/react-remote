import ItemRender from './ItemRender';
import ReactDOM from 'react-dom';
import ArrayUtil from '../../utils/ArrayUtil';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-30 09:54:15
 */
class TreeItemRenderBase extends ItemRender {
	/**
	 * 默认显示的文本标签
	 * 1、如果labelFunction有值，则使用labelFunction计算
	 * 2、否则，如果data:TreeNodeData有值，则使用data.data.toString()
	 * 3、如果data也无值，则返回''
	 * @readonly
	 * @memberof ItemRender
	 */
	get label() {
		if (this.data) {
			if (this._labelFunction) {
				return this._labelFunction(this.data);
			}
			else if (this.data.value) {
				return this.data.value.toString();
			}
		}
		return '';
	}

	_initProperty() {
		super._initProperty();
		this._isOpen = false;
		this._children = null;
	}

	get levelIndex() {
		if (this.data) {
			return this.data.levelIndex;
		}
		return 0;
	}

	get childrenCount() {
		if (!this.data || !this.data.children) {
			return 0;
		}
		return this.data.children.length;
	}

	get isOpen() {
		return this._isOpen;
	}

	set isOpen(value) {
		if (this._isOpen !== value) {
			this._isOpen = value;
			this._updateSkinStatus();
			this._renderChildren();
		}
	}

	get skinClass() {
		return super.skinClass;
	}
	set skinClass(value) {
		super.skinClass = value;

		//皮肤类变化，重建子项
		this._children = null;
		this._renderChildren();
	}

	/**
	 * 当前皮肤状态
	 * normal--普通状态
	 * open--打开状态
	 * selected——选中状态
	 * open-selected——打开且选中
	 */
	_getCurrentSkinStatus() {
		let result = [];
		if (this._isOpen)
			result.push('open');
		if (this._selected)
			result.push('selected');
		if (result.length === 0)
			result.push('normal');
		return result.join('-');
	}

	/**
	* 
	* @type {}
	* @default 
	*/
	get selectedValue() {
		return this._selectedValue;
	}
	set selectedValue(value) {
		if (this._selectedValue !== value) {
			this._selectedValue = value;
			this.forceUpdate();
		}
	}

	/**
	 * 子结点的容器
	 */
	get childrenContainer() {
		return this.findSkinPart('childrenContainer');
	}

	/**
	 * 当前结点内容的显示容器
	 */
	get nodeContainer() {
		return this.findSkinPart('nodeContainer');
	}

	get data() {
		return super.data;
	}
	set data(value) {
		let oldSelected = this.selected;
		super.data = value;
		if (oldSelected !== this.data.selected) {
			this.selected = this.data.selected;
		}

		//数据变化，重建子项
		this._children = null;
		this._renderChildren();
	}

	get selected() {
		if (this.data) {
			return this.data.selected;
		}
		return this._selected;
	}
	set selected(value) {
		if (this._selected !== value) {
			if (this.data) {
				this.data.selected = value;
			}
			super.selected = value;
		}
	}

	_initSkin() {
		super._initSkin();
		
		this._renderChildren();
		if (this.nodeContainer) {
			this.nodeContainer.onclick = this._nodeContainerClickHandler;
		}
	}

	/**
	 * 
	 * @private
	 */
	_renderChildren() {
		if (this.isOpen) {
			if (this._isOpen) {
				this._children = this._createChildrenItem();
			}
			if (this.childrenContainer && this._children !== null) {
				ReactDOM.render(this._children, this.childrenContainer);
			}
		}
	}

	_createChildrenItem = () => {
		let result = null;
		if (this.data && !ArrayUtil.isEmpty(this.data.children)) {
			result = this.data.children.map((value, index, array) => {
				return this.props.createItemRender(value, index);
			});
		}
		return result;
	}

	_nodeContainerClickHandler = (event) => {
		this.selected = true;
	}
}

export default TreeItemRenderBase;