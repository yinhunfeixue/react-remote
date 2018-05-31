import EventDispatcher from './EventDispatcher';
/**
 * 表示一个集合
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-27 17:43:36
 */
class Collection extends EventDispatcher {

	/**
	 * 实例化一个集合
	 * @param {Array} data 数据源
	 */
	constructor(data = null) {
		super();
		this._data = data ? data : [];
	}

	/**
	 * 添加一项，如果此项在集合中已存在，则不添加
	 * @param {*} item 要添加的项
	 */
	addItem(item) {
		this.addItemAt(item, this._data.length);
	}

	/**
	 * 在指定位置添加指定项。如果此项在集合中已存在，或者指定位置超出集合范围，不进行任何操作
	 * @param {*} item 要添加的项
	 * @param {Number} index 要插入的位置
	 */
	addItemAt(item, index) {
		if (!this.hasItem(item) && index >= 0 && index <= this._data.length) {
			this._data.splice(index, 0, item);
		}
	}

	/**
	 * 判断集合是否包含指定项
	 * @param {*} item 要查找的项
	 * 
	 * @return {boolean} 集合是否包含指定项
	 */
	hasItem(item) {
		return this.getItemIndex(item) >= 0;
	}

	/**
	 * 获取指定项在集合中的位置
	 * @param {*} item 要查找的项
	 * 
	 * @return {Number} 指定项在集合中的位置，如果不存在返回-1
	 */
	getItemIndex(item) {
		return this._data.indexOf(item);
	}

	/**
	 * 获取集合中指定位置的项，如果位置超出集合实际的范围，返回Null
	 * @param {Number} index 位置
	 * 
	 * @return {*} 查找出的项
	 */
	getItemAt(index) {
		if (index >= 0 && index < this._data.length) {
			return this._data[index];
		}
		return null;
	}

	/**
	 * 从集合中移除指定项
	 * @param {*} item 要移除的项
	 */
	removeItem(item) {
		let index = this.getItemIndex(item);
		if (index !== -1) {
			this._data.splice(index, 1);
		}
	}

	/**
	 * 删除指定位置的项，如果位置超出集合实际范围，不进行任何操作
	 * @param {Number} index 指定位置
	 * 
	 * @return {*} 被删除的项，如果未删除任何项，返回Null
	 */
	removeItemAt(index) {
		if (index >= 0 && index < this._data.length) {
			return this._data.splice(index, 1)[0];
		}
		return null;
	}

	/**
	 * 清空集合
	 */
	clear() {
		this._data = [];
	}
}
export default Collection;
