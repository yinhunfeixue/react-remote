import RemoteEvent from '../../events/RemoteEvent';
import SkinableComponent from '../SkinableComponent';
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 拥有一组子项，其中只能有一个子项被选中
 * 
 * @date   : 2017-9-19 13:48:51
 * 
 * @extends SkinableComponent
 */
class ListBase extends SkinableComponent {

	constructor(props) {
		super(props);
		//优先使用selectedIndex做为选中项
		if (this.props.selectedIndex !== undefined) {
			this.selectedIndex = this.props.selectedIndex;
		}
		else if (this.props.selectedValue) {
			this.selectedValue = this.props.selectedValue;
		}
	}

	/**
	* 子项类型
	* @type {function}
	* @default {@link ListItemRender}
	*/
	get itemClassType() {
		return this._itemClassType;
	}
	set itemClassType(value) {
		if (this._itemClassType !== value) {
			this._itemClassType = value;
		}
	}

	/**
	 * @inheritdoc
	 */
	_initProperty() {
		super._initProperty();
		this._labelFunction = null;
		this._itemClassType = null;
		this._selectedIndex = -1;
		this._changeHandler = null;
		this._children = [];
	}

	/**
	 * 根据data生成显示文字的方法。
	 * 此方法格式为func(item, index)， item是数据，index是数据所在的位置
	 * 生成显示文字有三种方法，优先级为：显式设置label属性 > labelFunction(data) > data.toString()
	 * 
	 * @type {function}
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
	 * 设置数据源。
	 * @type {Array}
	 */
	get data() {
		let result = [];
		if (this._children) {
			for (let i = 0; i < this._children.length; i++) {
				result.push(this._children[i].value);
			}
		}
		return result;
	}

	set data(value) {
		this._children = this._translateData(value);
		this.forceUpdate();
	}

	/**
	 * 选中项变化后执行的函数，事件类型{@link RemoteEvent#CHANGE}
	 * @type {function}
	 */
	get changeHandler() {
		return this._changeHandler;
	}

	set changeHandler(value) {
		if (this._changeHandler !== value) {
			this._changeEventListener(RemoteEvent.CHANGE, value, this._changeHandler);
			this._changeHandler = value;
		}
	}

	/**
	 * 表示当前选中项的位置
	 * 初始化时优先级问题，请参考{@link RadioButtonGroup#selectedValue selectedValue}
	 * 
	 * @type {number}
	 */
	get selectedIndex() {
		return this._selectedIndex;
	}

	set selectedIndex(value) {
		if (this._selectedIndex !== value) {
			this._selectedIndex = value;
			this.dispatchEvent(new RemoteEvent(RemoteEvent.CHANGE));
			this.forceUpdate();
		}
	}

	/**
	 * 组中所选 RadioButton 组件的 Value 属性。
	 * 设置选中项，有两种设置办法：selectedValue，selectedIndex。
	 * 在初始化时，优先级为：selectedIndex > selectedValue。
	 * <font color='red'>通过此方法设置选中项，如果有重复值，会选中重复值的第一项。</font>
	 * @type {*}
	 */
	get selectedValue() {
		return this.data[this.selectedIndex];
	}

	set selectedValue(value) {
		if (!this._children) {
			return;
		}

		let newIndex = -1;
		for (let i = 0; i < this._children.length; i++) {
			if (this._children[i].value === value) {
				newIndex = i;
				break;
			}
		}
		this.selectedIndex = newIndex;
	}

	/**
	 * 把外部数据源转换成指定格式的数据源
	 * @param {*} data 携带的数据
	 * 
	 * @private
	 */
	_translateData(data) {
		if (data) {
			let result = [];
			for (let i = 0; i < data.length; i++) {
				result.push({ value: data[i] });
			}
			return result;
		}
		return [];
	}

	/**
	 * 根据数据项，创建对应的显示文本
	 * @param {object} itemData 数据，value值
	 * @param {number} index 数据在集合中的位置
	 * 
	 * @private
	 */
	_createLabel(itemData, index) {
		//优先使用labelFunction,最后使用toString()
		if (itemData) {
			if (this._labelFunction) {
				return this._labelFunction(itemData, index);
			}
			else if (itemData.toString) {
				return itemData.toString();
			}
		}
		return '';
	}

	/**
	 * @inheritdoc
	 */
	_initSkin() {
		super._initSkin();
		this._renderItems();
	}

	/**
	 * 皮肤部件，表示子项的容器
	 */
	get container() {
		return this.findSkinPart('container');
	}

	/**
	 * 创建一项的props
	 * @protected
	 * @param {*} data 
	 * @param {*} index 
	 */
	_createItemProps(data, index) {
		return {
			key: index,
			data: data,
			index: index,
			label: this._createLabel(data, index),
			enable:this.enable
		};
	}
	/**
	 * @private
	 */
	_renderItems() {
		if (this.container && this._children) {
			let elements = this._children.map((item, index, array) => {
				return React.createElement(this.itemClassType, this._createItemProps(item.value, index));
			})
			ReactDOM.render(elements, this.container);
		}
	}
}

export default ListBase;