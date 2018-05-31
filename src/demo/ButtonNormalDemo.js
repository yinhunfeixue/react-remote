import DemoBase from './DemoBase';
import Button from '../components/Button';
import React from 'react';

/**
 * 普通按钮
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-24 10:58:55
 */
class ButtonNormalDemo extends DemoBase {

	constructor(props) {
		super(props);
		this.state = {
			clickNumber: 0
		}

		this.demoName = '基本属性';   //---
	}

	renderDemo() {
		return (
			<div>
				<h5>普通可点击按钮</h5>
				<Button ref='btn' label='按钮' onClick={(event) => {
					this.setState({ clickNumber: this.state.clickNumber + 1 }, () => {
						this.refs.btn.label = '按钮被点击 ' + this.state.clickNumber;
					});
				}} />

				<h5>样式</h5>
				<Button label='className="success"' className='success' />
				<Button label='className="success" 禁用' className='success' enable={false}/>
				<span className='space'></span>
				<Button label='className="warn"' className='warn' />
				<Button label='className="warn" 禁用' className='warn' enable={false}/>


				<h5>禁用</h5>
				<Button label='禁用按钮' enable={false} />
			</div >
		);
	}
}
export default ButtonNormalDemo;
