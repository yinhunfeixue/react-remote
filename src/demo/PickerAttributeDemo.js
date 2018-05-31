import DemoBase from './DemoBase';
import React from 'react';
import Picker from '../components/Picker';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-6 11:34:10
 */
class PickerAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);

		let data = [];
		for (let i = 0; i < 50; i++) {
			data.push(i.toString());
		}
		this.state = { data: data };

		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<h5>创建(试试用鼠标上下拖动下面的文字）</h5>
				<Picker data={this.state.data} />

				<h5>设置默认选中项的序号（从0开始算）</h5>
				<Picker data={this.state.data} selectedIndex={3} />

				<h5>设置显示出来的数量</h5>
				<div>建议为奇数，因为设置为偶数时，最上面和最下面的项会只显示一半。下面右边的选择器显示出来6项，可以拖动后看看</div>
				<Picker data={this.state.data} displayItemNumber={7} selectedIndex={5} />
				<Picker data={this.state.data} displayItemNumber={6} selectedIndex={5} />

				<h5>设置每一项的高度（60）</h5>
				<Picker data={this.state.data} itemHeight={60} />

				<h5>禁用</h5>
				<Picker data={this.state.data} enable={false} />
			</div>
		);
	}
}
export default PickerAttributeDemo;