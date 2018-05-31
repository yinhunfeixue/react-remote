import React from 'react';
import DemoBase from './DemoBase';
import Button from '../components/Button';

/**
 * 长按，自动点击 
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-24 11:08:17
 */
class ButtonAutoClickDemo extends DemoBase {

	constructor(props) {
		super(props);

		this.state = {
			autoClickNumber: 0,
			autoClickNumber2: 0
		}

		this.demoName = '长按自动点击';
	}

	renderDemo() {
		return (
			<div>
				<h5>长按按钮</h5>
				<Button ref='btnAuto' label='长按按钮' autoRepeatClick={true} onClick={(event) => {
					this.setState({ autoClickNumber: this.state.autoClickNumber + 1 }, () => {
						this.refs.btnAuto.label = '按钮自动点击 ' + this.state.autoClickNumber;
					});
				}} />
				<h5>长按按钮，自定义间隔时间</h5>
				<Button ref='btnAuto2' label='长按按钮' autoRepeatClick={true} repeatIntervalTime={1000} onClick={(event) => {
					this.setState({ autoClickNumber2: this.state.autoClickNumber2 + 1 }, () => {
						this.refs.btnAuto2.label = '按钮自动点击 ' + this.state.autoClickNumber2;
					});
				}} />

			</div>
		);
	}

}
export default ButtonAutoClickDemo;
