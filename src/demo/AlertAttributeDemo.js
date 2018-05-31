import React from 'react';
import Alert from '../components/Alert';
import DemoBase from './DemoBase';
import Button from '../components/Button';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-28 11:25:10
 */
class AlertAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '基本属性';
	}


	renderDemo() {
		return (
			<div>
				<h5>显示警告框</h5>
				<Button label='点我弹出警告框' onClick={(event) => {
					Alert.show('标题', '内容');
				}} />

				<h5>设置显示的按钮警告框</h5>
				<Button style={{ marginRight: '10px' }} label='点我弹出两个按钮的警告框' onClick={(event) => {
					Alert.show('标题', '内容', null, [Alert.OK, Alert.CANCEL], ['确定', '取消']);
				}} />

				<Button label='点我弹出只能取消的警告框' onClick={(event) => {
					Alert.show('标题', '内容', null, [Alert.CANCEL], ['取消']);
				}} />

				<h5>设置关闭时的处理函数</h5>
				<Button style={{ marginRight: '10px' }} label='点我弹的窗口关闭时会改变右边的文字' onClick={(event) => {
					Alert.show('标题', '内容', (event) => {
						this.refs.alertInfo.innerHTML = event.data;
					}, [Alert.OK, Alert.CANCEL]);
				}} />
				<span ref='alertInfo'>窗口关闭时，我会改变</span>


				<h5>自定义窗口内容</h5>
				<Button style={{ marginRight: '10px' }} label='点击弹出窗口' onClick={(event) => {
					Alert.show('标题',
						<div>
							<Button label='按钮1' />
							<br/>
							<Button label='按钮1' />
							<Button label='按钮1' />
							<br/>
							<Button label='按钮1' />
							<Button label='按钮1' />
							<Button label='按钮1' />
							<br/>
							<Button label='按钮1' />
							<Button label='按钮1' />
							<Button label='按钮1' />
							<Button label='按钮1' />
						</div>
					);
				}} />
			</div>

		);
	}
}
export default AlertAttributeDemo;
