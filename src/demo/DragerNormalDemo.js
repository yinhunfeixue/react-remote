import DemoBase from './DemoBase';
import React from 'react';
import Button from '../components/Button';
import Drager from '../core/Drager';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-14 10:37:36
 */
class DragerNormalDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '拖动器';
	}

	componentDidMount = () => {
		let target1 = this.refs.btn.rootComponent;
		new Drager().bind(target1);

		let target2 = this.refs.btn2.rootComponent;
		new Drager().bind(target2, null, true);

		new Drager().bind(this.refs.btn3.rootComponent, null, false, NaN, NaN, 200, 200);

		new Drager().bind(this.refs.btn4.rootComponent, null, false, 0, 0);

		new Drager().bind(this.refs.btn5.rootComponent, null, false, 0, 100, 400, 500);
	}


	renderDemo() {
		return (
			<div>
				<h5>拖动功能绑定到任意显示对象-new Drager().bind(target)</h5>
				<div style={{ border: '1px solid gray', position: 'relative', minHeight: '500px' }}>
					<Button ref='btn' style={{ zIndex: '5', position: 'absolute', transition: 'none' }} label='我可以拖动，但是不能拖出浏览器窗口' />

					<Button ref='btn2' style={{ zIndex: '5', position: 'absolute', transition: 'none', top: '100px' }} label='我可以拖出浏览器窗口' />

					<Button ref='btn3' style={{ zIndex: '5', position: 'absolute', transition: 'none', top: '200px' }} label='只能在水平方向拖动' />

					<Button ref='btn4' style={{ zIndex: '5', position: 'absolute', transition: 'none', top: '300px' }} label='只能在竖直方向拖动' />

					<Button ref='btn5' style={{ zIndex: '5', position: 'absolute', transition: 'none', top: '400px' }} label='只能在一小块区域拖动' />
				</div>
			</div>
		);
	}
}
export default DragerNormalDemo;