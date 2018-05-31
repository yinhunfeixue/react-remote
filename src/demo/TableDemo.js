import TableColumn from '../components/TableColumn';
import Table from '../components/Table';
import TableControlCellRender from './TableControlCellRender';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-10 09:52:02
 */
import React, { Component } from 'react'

export default class TableDemo extends Component {
	constructor(props) {
		super(props);


		let data = [
			{ name: 'a', age: 1, sex: 'male' },
			{ name: 'b', age: 2, sex: 'maale' },
			{ name: 'c', age: 5, sex: 'male' }
		];

		let columns = [
			new TableColumn('姓名', 'name', this.nameLabelFunction),
			new TableColumn('年龄', 'age'),
			new TableColumn('性别', 'sex', this.sexLabelFunction),
			new TableColumn('操作', '', null, TableControlCellRender),
		];

		this.state = {
			data: data,
			col: columns,
		};
	}

	sexLabelFunction(data, rowIndex, colIndex) {
		return data.sex === 'male' ? '男' : '女';
	}
	nameLabelFunction(data, rowIndex, colIndex) {
		return data.name;
	}
	render() {
		return (
			<div>
				<Table className='smallTable' data={this.state.data} columns={this.state.col} index={3} />
			</div>
		)
	}
}

