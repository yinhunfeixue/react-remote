import SkinableComponent from './SkinableComponent';
import RemoteEvent from '../events/RemoteEvent';
import DropListSkin from '../skins/DropListSkin';
import TextEvent from '../events/TextEvent';
/**
 * DropList 控件包含下拉列表，用户可从中选择单个值
 * 
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-20 14:10:32
 */
class DropList extends SkinableComponent {

	/**
	 * 下拉框
	 * @type {List}
	 */
	get dropList() {
		return this.findSkinPart('dropList');
	}

	/**
	 * @type {Button}
	 */
	get dropTextInput() {
		return this.findSkinPart('dropTextInput');
	}

	/**
	 * 是否打开状态
	 * @type {boolean}
	 */
	get isOpen() {
		return this._isOpen;
	}

	set isOpen(value) {
		if (this._isOpen !== value) {
			this._isOpen = value;
			this._updateSkinStatus();
			if (this._isOpen) {
				this._updateDropList();
			}
		}
	}

	/**
	 * 
	 * @type {}
	 * @default 
	 */
	get enable() {
		return this._enable;
	}
	set enable(value) {
		if (this._enable !== value) {
			if (this.dropList) {
				this.dropList.enable = value;
			}
			if (this.dropTextInput) {
				this.dropTextInput.enable = value;
			}
			super.enable = value;
		}
	}

	/**
	 * 
	 * @type {}
	 * @default 
	 */
	get selectedIndex() {
		return this._selectedIndex;
	}
	set selectedIndex(value) {
		if (this._selectedIndex !== value) {
			this._selectedIndex = value;
			this._updateDropList();
			this._updateLabel();
			this.dispatchEvent(new RemoteEvent(RemoteEvent.CHANGE));
		}
	}

	/**
	 * 
	 * @type {}
	 * @default 
	 */
	get selectedValue() {
		if (this._data && this._selectedIndex >= 0)
			return this._data[this._selectedIndex];
	}
	set selectedValue(value) {
		if (this._data) {
			let index = this._data.indexOf(value);
			if (index !== this.selectedIndex)
				this.selectedIndex = index;
		}
	}

	_getDefaultSKinClass() {
		return DropListSkin;
	}

	/**
	* 
	* @type {}
	* @default 
	*/
	get data() {
		return this._data;
	}
	set data(value) {
		if (this._data !== value) {
			this._data = value;
			this._updateDropList();
		}
	}

	/**
	* 
	* @type {}
	* @default 
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
			this._updateDropList();
			this._updateLabel();
		}
	}

	/**
	 * 
	 * @type {}
	 * @default 
	 */
	get placeholder() {
		return this._placeholder;
	}
	set placeholder(value) {
		if (this._placeholder !== value) {
			this._placeholder = value;
			if (this.dropTextInput) {
				this.dropTextInput.placeholder = value;
			}
		}
	}


	/**
	 * 搜索函数。用于比较数据项和关键词是否匹配
	 * 格式为fun(item, key): boolean
	 * 
	 * 默认匹配方法为：查找item的所有属性值和item.toString()，如果其中有一项包含key值，则认为匹配
	 */
	get searchFunction() {
		return this._searchFunction;
	}
	set searchFunction(value) {
		if (this._searchFunction !== value) {
			this._searchFunction = value;
		}
	}

	/**
	 * 添加新数据项的方法，格式为fun(text):object
	 * text为输入的内容，返回值为要添加的新项；如果返回值为Null,表示不添加
	 * 此属性为空表示把text做为新数据项添加
	 */
	get newValueFunction() {
		return this._newValueFunction;
	}
	set newValueFunction(value) {
		if (this._newValueFunction !== value) {
			this._newValueFunction = value;
		}
	}

	/**
	 * 是否可搜索
	 */
	get searchAble() {
		return this._searchAble;
	}
	set searchAble(value) {
		if (this._searchAble !== value) {
			this._searchAble = value;
			this.dropTextInput.editable = this._searchAble || this._inputAble;
		}
	}

	get inputAble() {
		return this._inputAble;
	}
	set inputAble(value) {
		if (this._inputAble !== value) {
			this._inputAble = value;
			this.dropTextInput.editable = this._searchAble || this._inputAble;
		}
	}

	_initProperty() {
		super._initProperty();
		this._data = [];
		this._isOpen = false;
		this._selectedIndex = -1;
		this._changeHandler = null;
		this._placeholder = '';
		this._labelFunction = null;
		this._displayData = [];
		this._key = null;
		this._searchFunction = null;
		this._searchAble = false;
		this._inputAble = false;
		this._newValueFunction = null;
	}

	_updateDisplayData() {
		if (this._searchAble && this._data && this._key && this._key.length > 0) {
			this._displayData = [];
			for (let i = 0; i < this._data.length; i++) {
				const element = this._data[i];
				if (this._compareItemAndKey(element, this._key)) {
					this._displayData.push(element);
				}
			}
		}
		else if (this._data) {
			this._displayData = this._data.concat();
		}
		else {
			this._displayData = [];
		}
	}

	_compareItemAndKey(item, keyWord) {
		if (this._searchFunction) {
			return this._searchFunction(item, keyWord);
		}
		else {
			if (item) {
				if (item instanceof Object) {
					for (let key in item) {
						let property = item[key];
						if (property.indexOf(keyWord) >= 0)
							return true;
					}
				}
				if (item.toString().indexOf(keyWord) >= 0)
					return true;
			}
			return false;
		}
	}

	_createNewItem(text) {
		if (this._newValueFunction) {
			return this._newValueFunction(text);
		}
		else {
			return text;
		}
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

	_updateLabel() {
		if (this.dropTextInput) {
			let item = this.selectedValue;
			let newText = null;
			if (item) {
				let label = this._createLabel(item, this.selectedIndex);
				newText = label;
			}

			if (newText !== this.dropTextInput.text) {
				this.dropTextInput.removeEventListener(TextEvent.TEXT_CHANGE, this.dropTextInput_changeHandler);
				this.dropTextInput.text = newText;
				this.dropTextInput.addEventListener(TextEvent.TEXT_CHANGE, this.dropTextInput_changeHandler);
			}
		}
	}

	_updateDropList() {
		if (this.dropList) {
			this.dropList.removeEventListener(RemoteEvent.CHANGE, this.dropList_changeHandler);
			this._updateDisplayData();
			this._key = null;
			this.dropList.data = this._displayData;
			this.dropList.selectedValue = this.selectedValue;
			if (this.isOpen) {
				this.dropList.addEventListener(RemoteEvent.CHANGE, this.dropList_changeHandler);
				document.addEventListener('click', this.document_clickHandler);
			}
			else {
				if (this.dropTextInput) {
					this.dropTextInput.focus();
				}
			}
		}
	}

	_initSkin() {
		super._initSkin();
		if (this.dropTextInput) {
			this.dropTextInput.rootComponent.addEventListener('click', this.dropTextInput_clickHandler);
			this.dropTextInput.addEventListener(TextEvent.TEXT_CHANGE, this.dropTextInput_changeHandler);
			this.dropTextInput.addEventListener(RemoteEvent.ENTER, this.dropTextInput_enterHandler);
			this.dropTextInput.enable = this.enable;
			this.dropTextInput.editable = this._searchAble || this._inputAble;
			this.dropTextInput.placeholder = this._placeholder;
		}
		if (this.dropList) {
			this.dropList.labelFunction = this.labelFunction;
			this.dropList.enable = this.enable;
			this.dropList.data = this._data;
		}
		this._updateLabel();
	}

	_unstallSkin() {
		if (this.dropTextInput) {
			this.dropTextInput.rootComponent.removeEventListener('click', this.dropTextInput_clickHandler);
			this.dropTextInput.removeEventListener(TextEvent.TEXT_CHANGE, this.dropTextInput_changeHandler);
			this.dropTextInput.removeEventListener(RemoteEvent.ENTER, this.dropTextInput_enterHandler);
		}
		super._unstallSkin();
	}

	dropTextInput_clickHandler = (event) => {
		this.isOpen = !this.isOpen;
	}

	dropTextInput_changeHandler = (event) => {
		this._key = event.currentTarget.text;
		this._isOpen = true;
		this._updateDropList();
		this._updateSkinStatus();
	}

	dropList_changeHandler = (event) => {
		this.selectedValue = event.currentTarget.selectedValue;
		this.isOpen = false;
	}

	dropTextInput_enterHandler = (event) => {
		if (this._inputAble) {
			let newItem = this._createNewItem(event.currentTarget.text);
			if (newItem) {
				this._data.push(newItem);
			}
			if (this.isOpen)
				this._updateDropList();
		}
		event.currentTarget.text = '';
	}
	document_clickHandler = (event) => {
		if (!this.rootComponent || !this.rootComponent.contains(event.target)) {
			this.isOpen = false;
		}
	}

	/**
	 * 皮肤状态
	 * @property {string} unable 不可用
	 * @property {string} open 打开状态
	 * @property {string} unable-open 不可用且打开
	 */
	_getCurrentSkinStatus() {
		let superStatus = super._getCurrentSkinStatus();
		let result = [];
		if (superStatus) {
			result.push(superStatus);
		}
		if (this.isOpen) {
			result.push('open');
		}
		return result.join('-');
	}
}
export default DropList;
