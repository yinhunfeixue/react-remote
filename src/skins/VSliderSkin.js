import SkinBase from './SkinBase';
import React from 'react';
import './less/VSlider.less';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/9 下午4:20:35
 */
class hSliderBarSkin extends SkinBase {
	constructor(props) {
		super(props, 'vslider');
	}

	render() {
		return (
			<div ref='track' className='vslider-track'>
				<div className='vslider-filled-track'
					style={{ height: ((this.target.value - this.target.minValue) * 100 / (this.target.maxValue - this.target.minValue)) + '%' }} />
				<div ref='thumb' className='vslider-thumb'></div>
			</div>
		);
	}
}

export default hSliderBarSkin;