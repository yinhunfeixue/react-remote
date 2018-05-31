import UIComponent from './UIComponent';
import React from 'react';
import BreadcrumItemRender from './BreadcrumItemRender';
/**
 * 面包屑导航，用于显示多个层级的顺序，例如网站导航
 * 面包屑子项有两个主要属性
 * <ul>
 * 	<li>label--表示显示的文字，优先使用labelFunction计算，其次使用数据的label属性，再次使用data.toString()。如果都不存在，返回''</li>
 * 	<li>href--表示链接，，优先使用hrefFunction计算，其次使用数据的href属性，再次使用data.toString()。如果都不存在，返回''</li>
 * </ul>
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-29 14:24:47
 */
class Breadcrumb extends UIComponent {
	_initProperty() {
		super._initProperty();
		this._data = [];
		this._itemClassType = BreadcrumItemRender;
		this._labelFunction = null;
		this._hrefFunction = null;
		this._selectedIndex = -1;
	}

	get selectedIndex() {
		return this._selectedIndex;
	}
	set selectedIndex(value) {
		if (this._selectedIndex !== value) {
			this._selectedIndex = value;
			this.forceUpdate();
		}
	}
	/**
	 * 计算子项label属性的函数，格式为fun(data, index, count)
	 * data--数据项
	 * index--序号，从0开始
	 * count--一共有多少项
	 * @type {function}
	 * @default null
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
	 * 计算子项href属性的函数，格式为fun(data, index, count)
	 * data--数据项
	 * index--序号，从0开始
	 * count--一共有多少项
	 * @type {function}
	 * @default null
	 */
	get hrefFunction() {
		return this._hrefFunction;
	}
	set hrefFunction(value) {
		if (this._hrefFunction !== value) {
			this._hrefFunction = value;
			this.forceUpdate();
		}
	}

	/**
	 * 数据源，其中每一项表示一个子项的数据
	 * @type {array}
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

	item_changeHandler = (event) => {
		let target = event.currentTarget;
		if (target.selected) {
			this.selectedIndex = target.index;
		}
	}

	render() {
		let elements = [];
		if (this._data && this._data.length > 0) {
			elements = this._data.map((value, index, array) => {
				return React.createElement(this._itemClassType,
					{
						key: index,
						index: index,
						count: array.length,
						data: value,
						selected: this.selectedIndex === index,
						labelFunction: this._labelFunction,
						hrefFunction: this._hrefFunction,
						changeHandler: this.item_changeHandler
					});
			});
		}
		return (
			<div>{elements}</div>
		);
	}
}

export default Breadcrumb;