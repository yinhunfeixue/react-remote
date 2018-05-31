import Collection from '../core/Collection';
import RemoteEvent from '../events/RemoteEvent';
import DataEvent from '../events/DataEvent';
/**
 * 单选按钮组
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-28 08:57:20
 */
class RadioButtonGroup extends Collection {
	addItemAt(item, index) {
		super.addItemAt(item, index);
		item.addEventListener(RemoteEvent.CHANGE, this.item_changeHandler);
	}

	removeItemAt(index) {
		let item = super.removeItemAt(index);
		if (item) {
			item.removeEventListener(RemoteEvent.CHANGE, this.item_changeHandler);
		}
	}

	removeItem(item) {
		if (item) {
			item.removeEventListener(RemoteEvent.CHANGE, this.item_changeHandler);
		}
		super.removeItem(item);
	}

	unSelected() {
		if (this._data && this._data.length > 0) {
			for (let i = 0; i < this._data.length; i++) {
				let item = this._data[i];
				item.selected = false;
			}
		}
	}

	item_changeHandler = (event) => {
		//有一项被选中，则取消其它所有项的选中
		let target = event.currentTarget;
		if (target.selected) {
			this.selectedValue = target.value;
		}
	}

	/**
	 * 当前选中的值列表
	 * 设置为Null,表示不选中任何项
	 * @type {Array}
	 */
	get selectedValue() {
		let result = [];
		if (this._data && this._data.length > 0) {
			for (let i = 0; i < this._data.length; i++) {
				let item = this._data[i];
				if (item.selected) {
					return item.value;
				}
			}
		}
		return result;
	}

	set selectedValue(value) {
		if (this._data && this._data.length > 0) {
			let selectedValue = null;
			for (let i = 0; i < this._data.length; i++) {
				let item = this._data[i];
				if (item.value === value) {
					item.selected = true;
					selectedValue = item.value;
				}
				else {
					item.selected = false;
				}
			}
			if (selectedValue) {
				this.dispatchEvent(new DataEvent(DataEvent.DATA_CHANGED, selectedValue));
			}
		}
	}
}
export default RadioButtonGroup;
