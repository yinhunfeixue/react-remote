/**
 * 表示表格中的一列
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-10 09:13:15
 */
class TableColumn {
	constructor(title, key = null, labelFunction = null, itemRender = null, _headerRender = null) {
		this._index = 0;
		this._itemRender = itemRender;
		this._headerRender = _headerRender;
		this._title = title;
		this._textField = key;
		this._labelFunction = labelFunction;
	}

	get headerRender() {
		return this._headerRender;
	}
	set headerRender(value) {
		if (this._headerRender !== value) {
			this._headerRender = value;
		}
	}

	get labelFunction() {
		return this._labelFunction;
	}
	set labelFunction(value) {
		if (this._labelFunction !== value) {
			this._labelFunction = value;
		}
	}

	get index() {
		return this._index;
	}
	set index(value) {
		if (this._index !== value) {
			this._index = value;
		}
	}

	get itemRender() {
		return this._itemRender;
	}
	set itemRender(value) {
		if (this._itemRender !== value) {
			this._itemRender = value;
		}
	}

	get title() {
		return this._title;
	}
	set title(value) {
		if (this._title !== value) {
			this._title = value;
		}
	}

	get textField() {
		return this._textField;
	}
	set textField(value) {
		if (this._textField !== value) {
			this._textField = value;
		}
	}
}
export default TableColumn;
