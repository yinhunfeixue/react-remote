import SkinBase from './SkinBase';
import React from 'react';
import Button from '../components/Button';
import CloseButtonSkin from './CloseButtonSkin';
import MinButtonSkin from './MinButtonSkin';
import MaxButtonSkin from './MaxButtonSkin';
import './less/TitleWindow.less';

class TitleWindowSkin extends SkinBase {
	constructor(props) {
		super(props, null, { position: 'relative' });
	}
	render() {
		return (
			<div ref='container' className={this.getClassByStatus('titleWindow')}>
				<div className='header'>
					<div ref='moveArea' className='moveArea' />
					<span className='title' ref='titleLabel'></span>
					<div className='buttonContainer' ref='buttonContainer'>
						<Button ref='buttonMin' skinClass={MinButtonSkin} />
						<Button ref='buttonMax' skinClass={MaxButtonSkin} />
						<Button ref='buttonClose' skinClass={CloseButtonSkin} />
					</div>
				</div>
				<div className='contentContainer' ref='contentContainer'></div>
			</div>
		);
	}
}

export default TitleWindowSkin;