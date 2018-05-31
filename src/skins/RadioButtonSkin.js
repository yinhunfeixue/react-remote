import React from 'react';
import SkinBase from './SkinBase';
import './less/Radio.less';
export default class RadioButton extends SkinBase {
	constructor(props) {
		super(props, 'radioButton');
	}
	render() {
		return [
			<div key='point' className={'radioButton-point'}>
				<div className={'radioButton-point-inner'}></div>
			</div >,
			<span key='label' className='radioButton-label'>{this.target.label}</span>
		];
	}
};
