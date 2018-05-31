import TableCellItemRender from './TableCellItemRender';
import TableHeadCellSkin from '../skins/TableHeadCellSkin';
/**
 * 表示table组件一个表头项
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-10 14:15:58
 */
class TableHeaderItemRender extends TableCellItemRender {
	_getDefaultSKinClass() {
		return TableHeadCellSkin;
	}
}
export default TableHeaderItemRender;
