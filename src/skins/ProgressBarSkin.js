import SkinBase from './SkinBase';
import React from 'react';
import './less/ProgressBar.less';
/*
 * @author: xujunjie 
 * @Date: 2017-09-28 14:10:53 
 * @Last Modified by: xujunjie
 * @Last Modified time: 2017-09-28 15:36:04
 */
class ProgressBarSkin extends SkinBase {
	render() {
		return (
			<div className={this.getClassByStatus('progressBar')}>
				<div className='track'>
					<div className='bar' style={{ width: (this.target.value * 100 / this.target.maxValue) + '%' }} />
				</div>
				<span className='text'>{this.target.label}</span>
			</div>

		);
	}
}
export default ProgressBarSkin;