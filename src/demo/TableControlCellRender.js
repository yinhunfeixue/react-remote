import TableCellItemRender from '../components/TableCellItemRender';
import TableControlCellSkin from './TableControlCellSkin';
import Alert from '../components/Alert';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-10 14:20:18
 */
class TableControlCellRender extends TableCellItemRender {

	_initSkin() {
		super._initSkin();
		this.refs.btnDelete.onclick = this.btnDeleteClickHandler;
		this.refs.btnEdit.onclick = this.btnEditClickHandler;
	}

	btnEditClickHandler = (event) => {
		this.owner.isEdit = true;
	}

	btnDeleteClickHandler = (event) => {
		Alert.show('警告', `确认删除${this.data.name}`, null, [Alert.OK, Alert.CANCEL]);
	}

	_getDefaultSKinClass() {
		return TableControlCellSkin;
	}


}
export default TableControlCellRender;
