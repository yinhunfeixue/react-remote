import SkinableComponent from '../SkinableComponent';
import RemoteEvent from '../../events/RemoteEvent';
/*
 * 数据源显示项
 * @author: xujunjie 
 * @Date: 2017-09-28 17:12:07 
 * @Last Modified time: 2017-10-09 09:22:31
 * @private
 */
class ItemRender extends SkinableComponent {

	_initProperty() {
		super._initProperty();
		this._data = null;
		this._labelFunction = null;
		this._changeHandler = null;
		this._selected = false;
	}

	/**
	 * 用于显示文本标签的函数,格式为fun(data)，返回值类型string
	 * 
	 * @type {function}
	 * 
	 * @memberof ItemRender
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
	 * 皮肤状态
	 * @property {string} unable 禁用
	 * @property {string} selected 选中
	 * @property {string} unable-selected 选中且禁用
	 */
	_getCurrentSkinStatus() {
		let superStatus = super._getCurrentSkinStatus();
		let result = [];
		if (superStatus) {
			result.push(superStatus);
		}

		if (this.selected) {
			result.push('selected');
		}
		return result.join('-');
	}

	/**
	 * 表示是否选中
	 */
	get selected() {
		return this._selected;
	}
	set selected(value) {
		if (this._selected !== value) {
			this._selected = value;
			this._updateSkinStatus();
			this.dispatchEvent(new RemoteEvent(RemoteEvent.CHANGE));
		}
	}

	/**
	 * 选中后的处理函数，参数为RemoteEvent#Change
	 * 
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
	 * 默认显示的文本标签
	 * 1、如果labelFunction有值，则使用labelFunction计算
	 * 2、否则，如果data有值，则使用data.toString()
	 * 3、如果data也无值，则返回''
	 * @readonly
	 * @memberof ItemRender
	 */
	get label() {
		if (this.data) {
			if (this._labelFunction) {
				return this._labelFunction(this.data);
			}
			else {
				return this.data.toString();
			}
		}
		return '';
	}

	/**
	 * 携带的数据
	 * @type {any}
	 * @default null
	 */
	get data() {
		return this._data;
	}
	set data(value) {
		if (this._data !== value) {
			this._data = value;
			this.forceUpdate();
		}
	}
}
export default ItemRender;