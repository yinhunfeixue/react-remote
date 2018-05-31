import UIComponent from './UIComponent';
import TableRow from './TableRow';
import React from 'react';
import TableHeaderItemRender from './TableHeaderItemRender';
import '../skins/less/Table.less';

/*
 * 表格，通过设置列属性和数据，可自动展示数据
 * 
 * @author: xujunjie 
 * @Date: 2017-09-28 16:31:16 
 * @Last Modified time: 2017-10-10 12:39:21
 */
class Table extends UIComponent {
	_initProperty() {
		super._initProperty();
		this._columns = [];
		this._data = [];
	}

	get columns() {
		return this._columns;
	}
	set columns(value) {
		if (this._columns !== value) {
			this._columns = value;
			//设置序号
			if (this._columns) {
				this._columns.forEach((value, index, array) => {
					value.index = index;
				}, this);
			}
			this.forceUpdate();
		}
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

	addRow(rowData) {

	}

	subRow(rowIndex) {

	}

	addCol(column) {

	}

	subCol(column) {

	}

	_renderHeader() {
		let elements = [];
		if (this._columns) {
			elements = this._columns.map((value, index, array) => {
				let props = {
					rowIndex: this.index,
					data: value,
					column: value
				};

				let type = value.headerRender ? value.headerRender : TableHeaderItemRender;
				return <td key={index}>{React.createElement(type, props)}</td>
			});
		}
		return elements;
	}

	render() {
		let elements = [];
		if (this._data) {
			elements = this._data.map((value, index, array) => {
				return <TableRow data={value} columns={this._columns} index={index} key={index} />
			});
		}
		return <table className={'table ' + this.props.className} cellPadding='0' cellSpacing='0'><thead><tr>{this._renderHeader()}</tr></thead><tbody>{elements}</tbody></table>;
	}
}
export default Table;