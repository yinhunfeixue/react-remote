import SkinBase from './SkinBase';
import React from 'react';
import './less/HSlider.less';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/9 下午4:20:35
 */
class hSliderBarSkin extends SkinBase {
	constructor(props) {
		super(props, 'hslider');
	}

	render() {
		return (
			<div ref='track' className='hslider-track'>
				<div className='hslider-filled-track'
					style={{ width: ((this.target.value - this.target.minValue) * 100 / (this.target.maxValue - this.target.minValue)) + '%' }} />
				<div ref='thumb' className='hslider-thumb'></div>
			</div>
		);
	}
}

export default hSliderBarSkin;