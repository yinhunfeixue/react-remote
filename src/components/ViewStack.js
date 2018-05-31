import SkinableComponent from './SkinableComponent';
import ReactDOM from 'react-dom';
import NumberUtil from '../utils/NumberUtil';
import ViewStackSkin from '../skins/ViewStackSkin';
import ObjectUtil from '../utils/ObjectUtil';

/**
 * 选项卡容器
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-1 09:27:13
 */
class ViewStack extends SkinableComponent {


	_initProperty() {
		super._initProperty();
		this.ITEM_NAME = 'item';
		this.CONTAINER_NAME = 'container';
		this._children = [];
		this._lastIndex = -1;
		this._selectedIndex = -1;
	}

	get children() {
		return this._children;
	}
	set children(value) {
		if (!ObjectUtil.isEqual(this._children, value)) {
			this._children = value;
			this.initItems();
		}
	}

	_getDefaultSKinClass() {
		return ViewStackSkin;
	}

	initItems() {
		this.clear();
		let children = this._children;
		if (children) {
			for (let i = 0; i < children.length; i++) {
				const item = children[i];
				let key = item.key;
				if (key) {
					this.addItem(key, item);
				}
				else {
					throw new RangeError('viewStack的第' + i + '项缺少key值');
				}
			}
		}
	}

	get container() {
		return this.findSkinPart('container');
	}

	_initSkin() {
		super._initSkin();
		this._adpteSelectedIndex(this._selectedIndex);
	}

	addItem(key, item) {
		this.addItemAt(key, item, this._listItems.length);
	}

	addItemAt(key, item, index) {
		index = NumberUtil.limit(index, 0, this._listItems.length);
		this._dicItems[key] = {};
		//先添加子元素，但是不创建容器，容器在第一次显示时再创建
		this._dicItems[key][this.ITEM_NAME] = item;
		this._listItems.splice(index, 0, item);
	}

	removeItem(key) {
		let item = this._dicItems[key][this.ITEM_NAME];
		if (item) {
			let index = this._listItems.indexOf(item);
			this.removeItemAt(index);
		}
	}

	removeItemAt(index) {
		if (index >= 0 && index < this._listItems.length) {
			let item = this._listItems[index];
			this._listItems.splice(index, 1);
			for (let key in this._dicItems) {
				if (this._dicItems[key] === item) {
					if (this.container) {
						this.container.removeChild(this._dicItems[key][this.CONTAINER_NAME]);
					}
					delete this._dicItems[key];
					break;
				}
			}
			this._adpteSelectedIndex(this._selectedIndex);
		}
	}

	get selectedItem() {
		return this._listItems[this._selectedIndex];
	}

	get selectedIndex() {
		return this._selectedIndex;
	}

	set selectedIndex(value) {
		if (this._selectedIndex !== value) {
			this._lastIndex = this._selectedIndex;
			this._selectedIndex = value;
			this.forceUpdate();
		}
	}

	_adpteSelectedIndex(value) {
		//如果有子对象，必须选中一项
		let newIndex = value;
		if (this._listItems && this._listItems.length > 0) {
			newIndex = NumberUtil.limit(value, 0, this._listItems.length - 1);
		}
		else {
			newIndex = -1;
		}
		if (newIndex !== this._lastIndex) {
			this._selectedIndex = newIndex;
			if (this.container) {
				//隐藏上一次选中的项
				if (this._lastIndex >= 0) {
					let lastKey = this._getKey(this._listItems[this._lastIndex]);
					let lastContainer = this._dicItems[lastKey][this.CONTAINER_NAME];
					if (lastContainer) {
						lastContainer.style.display = 'none';
					}
				}
				if (this.selectedIndex >= 0) {
					//如果未初始化过，则进行初始化
					let key = this._getKey(this.selectedItem);
					if (!this._dicItems[key][this.CONTAINER_NAME]) {
						this._dicItems[key][this.CONTAINER_NAME] = document.createElement('div');
						ReactDOM.render(this.selectedItem, this._dicItems[key][this.CONTAINER_NAME]);
						this.container.appendChild(this._dicItems[key][this.CONTAINER_NAME]);
					}
					this._dicItems[key][this.CONTAINER_NAME].style.display = 'unset';
				}
			}
		}
	}

	_getKey(item) {
		for (let key in this._dicItems) {
			if (this._dicItems[key][this.ITEM_NAME] === item) {
				return key;
			}
		}
		return null;
	}

	clear() {
		this._listItems = [];
		this._dicItems = {};
		if (this.container) {
			this.container.innerHTML = '';
		}
	}
}
export default ViewStack;