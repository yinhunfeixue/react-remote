import SliderBase from './supports/SliderBase';
import SliderUtil from './supports/SliderUtil';
import Point from '../core/Point';
import Skin from '../skins/HSliderSkin';

/**
 * 水平滑块，使用 HSlider（水平滑块）控件，用户可通过在滑块轨道的端点之间移动滑块来选择值。
 * 可设置最大值和最小值，以确保选择的值的范围
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/9 下午2:42:57
 * 
 * @extends SliderBase
 */
class HSlider extends SliderBase {

	_getDefaultSKinClass() {
		return Skin;
	}

	_pointToValue(point) {
		if (this.track && this.thumb) {
			return SliderUtil.pointToValue(point.x, this._minValue, this._maxValue, this._stepSize, this.track.offsetWidth, this.thumb.offsetWidth);
		}
		else {
			throw new Error('皮肤类中未包含track或thumb');
		}
	}

	_valueToPoint() {
		if (this.track && this.thumb) {
			let result = new Point();
			result.y = this.thumb.offsetTop;
			result.x = SliderUtil.valueToPosition(this._value, this._minValue, this._maxValue, this.track.offsetWidth, this.thumb.offsetWidth);
			return result;
		}
		else {
			throw new Error('皮肤类中未包含track或thumb');
		}
	}
}
export default HSlider;