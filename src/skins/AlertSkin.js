import SkinBase from './SkinBase';
import Button from '../components/Button';
import React from 'react';
import './less/Alert.less';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-26 09:31:54
 */

class AlertSkin extends SkinBase {
	constructor(target) {
		super(target, 'alert-root');
	}

	render() {
		return (
			<div ref='container' className={this.getClassByStatus('alert')}>
				<div className='header'>
					<div ref='moveArea' className='moveArea' />
					<span className='title' ref='titleLabel'></span>
					<div className='buttonContainer' ref='buttonContainer'></div>
				</div>
				<div className='contentContainer' ref='contentContainer'>

				</div>
				<div className='bottomContainer'>
					<Button ref='buttonOk' />
					<Button ref='buttonCancel' />
				</div>
			</div>
		);
	}
}

export default AlertSkin;