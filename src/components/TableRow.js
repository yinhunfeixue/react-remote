import UIComponent from './UIComponent';
import TableCellItemRender from './TableCellItemRender';
import React from 'react';

/**
 * 表示表格中的一行
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-10 09:36:49
 */
class TableRow extends UIComponent {
	_initProperty() {
		super._initProperty();
		this._data = null;
		this._columns = null;
		this._index = 0;
	}

	get data() {
		return this._data;
	}
	set data(value) {
		if (this._data !== value) {
			this._data = value;
			this.forceUpdate();
		}
	}

	get columns() {
		return this._columns;
	}
	set columns(value) {
		if (this._columns !== value) {
			this._columns = value;
			this.forceUpdate();
		}
	}

	get index() {
		return this._index;
	}
	set index(value) {
		if (this._index !== value) {
			this._index = value;
			this.forceUpdate();
		}
	}

	render() {
		let elements = [];
		if (this._data && this._columns) {
			elements = this._columns.map((value, index, array) => {
				let props = {
					rowIndex: this.index,
					data: this.data,
					column: value,
					owner: this
				};
				let type = value.itemRender ? value.itemRender : TableCellItemRender;
				return <td key={index}>{React.createElement(type, props)}</td>
			});
		}
		return <tr>{elements}</tr>;
	}
}
export default TableRow;
