import Collection from '../core/Collection'
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-28 08:57:20
 */
class CheckBoxGroup extends Collection {

	/**
	 * 全选
	 */
	selectedAll() {
		if (this._data && this._data.length > 0) {
			this._data.forEach((value) => {
				value.selected = true;
			});
		}
	}

	/**
	 * 全不选
	 */
	unselectedAll() {
		if (this._data && this._data.length > 0) {
			this._data.forEach((value) => {
				value.selected = false;
			});
		}
	}
	/**
	 * 当前选中的值列表
	 * @type {Array}
	 */
	get selectedValues() {
		let result = [];
		if (this._data && this._data.length > 0) {
			for (let i = 0; i < this._data.length; i++) {
				let item = this._data[i];
				if (item.selected) {
					result.push(item.value);
				}
			}
		}
		return result;
	}

	set selectedValues(values) {
		if (this._data && this._data.length > 0) {
			for (let i = 0; i < this._data.length; i++) {
				let item = this._data[i];
				item.selected = (values && values.indexOf(item.value) >= 0);
			}
		}
	}
}
export default CheckBoxGroup;
