import ItemRender from './supports/ItemRender';
import TableCellSkin from '../skins/TableCellSkin';

/*
 * 表示表格中的一项
 * @author: xujunjie 
 * @Date: 2017-09-28 17:06:20 
 * @Last Modified time: 2017-10-10 14:06:51
 */
class TableCellItemRender extends ItemRender {
	_getDefaultSKinClass() {
		return TableCellSkin;
	}

	_initProperty() {
		super._initProperty();
		this._rowIndex = 0;
		this._column = null;
		this._owner = null;
	}

	get owner() {
		return this._owner;
	}
	set owner(value) {
		if (this._owner !== value) {
			this._owner = value;
		}
	}

	get label() {
		if (this.data) {
			if (this._column) {
				if (this._column.labelFunction) {
					return this._column.labelFunction(this.data, this.rowIndex, this.columnIndex);
				}
				else if (this._column.textField) {
					return this.data[this._column.textField];
				}
			}
			return this.data.toString();
		}
		return '';
	}

	get rowIndex() {
		return this._rowIndex;
	}
	set rowIndex(value) {
		if (this._rowIndex !== value) {
			this._rowIndex = value;
			this.forceUpdate();
		}
	}

	get columnIndex() {
		if (this._column)
			return this._column.index;
		return 0;
	}
	set column(value) {
		if (this._column !== value) {
			this._column = value;
			this.forceUpdate();
		}
	}
	get column() {
		return this._column;
	}
}
export default TableCellItemRender;