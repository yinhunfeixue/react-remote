import SkinBase from '../skins/SkinBase';
import React from 'react';
import Button from '../components/Button';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-10 14:22:50
 */
class TableControlCellSkin extends SkinBase {
	render() {
		return (
			<div>
				<Button ref='btnEdit' label='删除'/>
				<Button ref='btnDelete' label='编辑'/>
			</div>
		);
	}
}
export default TableControlCellSkin;