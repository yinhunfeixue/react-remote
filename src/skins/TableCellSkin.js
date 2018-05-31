import SkinBase from './SkinBase';
import React from 'react';
import './less/TableCell.less';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-10 09:58:45
 */
class TableCellSkin extends SkinBase {

	get rootStyle(){
		return {
			display: ''
		};
	}

	render() {
		return <span className='tableCell'>{this.target.label}</span>
	}
}
export default TableCellSkin;
