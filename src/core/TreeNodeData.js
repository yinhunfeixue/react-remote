/*
 * 树结点数据结构
 * @author: xujunjie 
 * @Date: 2017-09-28 18:42:33 
 * @Last Modified by: xujunjie
 * @Last Modified time: 2017-11-22 11:55:49
 */
class TreeNodeData {


	/**
	 * 把指定Array转换成TreeNodeData的数组，默认格式如下
	 * [ {value:'a'}, {value:'b'}, {value:'c', children:[ {value:1, value:2} ]} ]
	 * 如果非默认格式，可通过参数指定每一项的值名称和子项列表名称
	 * 
	 * @param {*} arr 要转换的数组
	 * @param {*} valueName 值名称，不指定则使用'value'
	 * @param {*} childrenName 子项列表名称，不指定则使用'children'
	 */
	static createDataByArray(arr, valueName = null, childrenName = null) {
		if (arr && arr.length > 0) {
			const VALUE_NAME = valueName ? valueName : 'value';
			const CHILDREN_NAME = childrenName ? childrenName : 'children';
			let result = [];
			for (let i = 0; i < arr.length; i++) {
				let item = new TreeNodeData(arr[i][VALUE_NAME]);
				result.push(item);
				//如果有子项，则创建子项
				if (arr[i][CHILDREN_NAME] && arr[i][CHILDREN_NAME].length > 0) {
					item.children = TreeNodeData.createDataByArray(arr[i][CHILDREN_NAME], valueName, childrenName);
				}
			}
			return result;
		}
		return null;
	}
	constructor(value, children = null, selected = false) {
		this._value = value;
		this._selected = selected;
		this._levelIndex = 0;
		this.children = children;
	}

	get selected() {
		return this._selected;
	}
	set selected(value) {
		if (this.selected !== value) {
			this._selected = value;
		}
	}

	/**
	 * 当前结点携带的数据
	 * @type {any}
	 */
	get value() {
		return this._value;
	}
	set value(value) {
		if (this._value !== value) {
			this._value = value
		}
	}

	/**
	 * 子结点集合，其中每一项是TreeNodeData
	 * @type {Array}
	 * @default null
	 *
	 */
	get children() {
		return this._children;
	}
	set children(value) {
		if (this._children !== value) {
			this._children = value;
			this._updateChildrenLevelIndex();
		}
	}

	/**
	 * 当前结点的层级
	 * @type {number}
	 * 
	 * @default 0
	 */
	get levelIndex() {
		return this._levelIndex;
	}
	set levelIndex(value) {
		if (this._levelIndex !== value) {
			this._levelIndex = value;
			this._updateChildrenLevelIndex();
		}
	}

	_updateChildrenLevelIndex() {
		if (this.children !== null) {
			this.children.forEach(function (item) {
				item.levelIndex = this._levelIndex + 1;
			}, this);
		}
	}
}
export default TreeNodeData;