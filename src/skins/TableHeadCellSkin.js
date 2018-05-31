import React from 'react';
import SkinBase from './SkinBase';
import './less/TableHeadCell.less';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-10 11:12:18
 */
class TableHeadCellSkin extends SkinBase {
	render() {
		return <span className='tableHeadCell'>{this.target.data.title}</span>
	}
}
export default TableHeadCellSkin;
