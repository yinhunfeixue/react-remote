import React from 'react';
import DemoBase from './DemoBase';
import NumberSteper from '../components/NumberSteper';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-12-4 21:52:54
 */
class NumberStepAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<h5>创建（试试长按上、下按钮）</h5>
				<NumberSteper />

				<h5>设置默认值</h5>
				<NumberSteper value={60} />

				<h5>设置最大/最小值</h5>
				<NumberSteper value={60} minValue={-100} maxValue={100} />

				<h5>默认值超出范围</h5>
				<NumberSteper value={600} minValue={-100} maxValue={100} />

				<h5>设置步进值=5</h5>
				<NumberSteper value={600} minValue={-100} maxValue={100} stepSize={5}/>

				<h5>禁用</h5>
				<NumberSteper enable={false} />
			</div>
		);
	}
}
export default NumberStepAttributeDemo;
