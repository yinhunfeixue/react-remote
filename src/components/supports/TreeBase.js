import SkinableComponent from '../SkinableComponent';
import React from 'react';
import DataEvent from '../../events/DataEvent';
import ReactDOM from 'react-dom';
/**
 * 所有树结构控件的基类
 * @author: xujunjie 
 * @Date: 2017-09-28 18:39:15 
 * @Last Modified time: 2017-10-09 09:23:04
 * 
 * @extends SkinableComponent
 * @private
 */
class TreeBase extends SkinableComponent {

	get container() {
		return this.findSkinPart('container');
	}

	_initProperty() {
		super._initProperty();
		this._data = null;
		this._selectedValue = null;
		this._changeHandler = null;
		this._itemSkinClass = null;
		this._labelFunction = null;
		this._selectedItem = null;
	}

	/**
	 * 用于显示文本标签的函数,格式为fun(data)，返回值类型string
	 */
	get labelFunction() {
		return this._labelFunction;
	}
	set labelFunction(value) {
		if (this._labelFunction !== value) {
			this._labelFunction = value;
			this.forceUpdate();
		}
	}

	/**
	 * 子项的皮肤类型
	 */
	get itemSkinClass() {
		return this._itemClassType;
	}
	set itemSkinClass(value) {
		if (this._itemSkinClass !== value) {
			this._itemSkinClass = value;
			this.forceUpdate();
		}
	}

	/**
	 * 选中项变化时响应函数,参数为DataEvent对象
	 * @type {function}
	 * @default null
	 */
	get changeHandler() {
		return this._changeHandler;
	}
	set changeHandler(value) {
		if (this._changeHandler !== value) {
			this._changeEventListener(DataEvent.CHANGE, value, this._changeHandler);
			this._changeHandler = value;
		}
	}

	/**
	 * 当前选中的数据
	 * @type {TreeNodeData}
	 */
	get selectedValue() {
		return this._selectedValue;
	}
	set selectedValue(value) {
		if (this._selectedValue !== value) {
			this._selectedValue = value;
			this.forceUpdate();
			this.dispatchEvent(new DataEvent(DataEvent.CHANGE, value));
		}
	}

	/**
	 * 数据，子项是TreeNodeData类型的数据
	 * data属性和labelFunction决定了label属性
	 * @type {array}
	 */
	get data() {
		return this._data;
	}
	set data(value) {
		this._data = value;
		this.forceUpdate();
	}

	/**
	 * 默认获取结点的类的函数
	 * @param {TreeNodeData} itemValue 结点的数据
	 * 
	 * @protected
	 */
	_createItemRender = (itemValue, index) => {
		let props = {
			key: index, data: itemValue,
			selected: itemValue === this.selectedValue,
			changeHandler: this._itemSelectedHandler.bind(this),
			createItemRender: this._createItemRender.bind(this),
			selectedValue: this.selectedValue
		};
		if (this._itemSkinClass) {
			props.skinClass = this._itemSkinClass;
		}
		if (this.labelFunction) {
			props.labelFunction = this.labelFunction;
		}
		return React.createElement(this._itemClassType, props);
	}

	/**
	 * @protected
	 */
	get _itemClassType() {
		return null;
	}

	/**
	 * 当前选中的子项实例
	 */
	get selectedItem() {
		return this._selectedItem;
	}

	/**
	 * @protected
	 */
	_itemSelectedHandler = (event) => {
		let target = event.target;
		if (target.selected && this._selectedValue !== target.data) {
			this.selectedValue = target.data;
		}
	}

	_initSkin() {
		super._initSkin();
		this._renderItems();
	}

	_renderItems() {
		if (this.container && this._data !== null && this._data.length > 0) {
			let elements = [];
			for (let i = 0; i < this._data.length; i++) {
				let itemData = this._data[i];
				elements.push(this._createItemRender(itemData, i));
			}
			ReactDOM.render(elements, this.container);
		}
	}
}
export default TreeBase;