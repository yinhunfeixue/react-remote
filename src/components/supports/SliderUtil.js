import NumberUtil from '../../utils/NumberUtil';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-11 10:35:17
 */

class SliderUtil {

	/**
	 * 显示位置转换为轨道值
	 * @param {Number} position 相对轨道的显示位置，如果是水平坐标则取x，如果是竖直坐标，则取y
	 * @param {Number} minValue 最小值
	 * @param {Number} maxValue 最大值
	 * @param {Number} stepSize 步进值
	 * @param {Number} traceLength 轨道有效可见长度
	 * @param {Number} thumbLength 滑块有效可见长度
	 * 
	 * @return {Number} 对应的轨道值
	 */
	static pointToValue(position, minValue, maxValue, stepSize, traceLength, thumbLength) {
		let value = 0;
		let effectLength = traceLength;		//轨道有效长度
		if (effectLength <= 0) {
			value = 0;
		}

		if (position < 0) {
			value = minValue;
		}
		else if (position >= effectLength) {
			value = maxValue;
		}
		else {
			value = minValue + (maxValue - minValue) * position / effectLength;
			if (stepSize > 0) {
				value = Math.round(value / stepSize) * stepSize;
			}
		}
		return value;
	}

	/**
	 * 轨道值转换为显示位置
	 * @param {Number} value 值
	 * @param {Number} minValue 最小值
	 * @param {Number} maxValue 最大值
	 * @param {Number} trackLength 轨道长度
	 * @param {Number} thumbLength 滑块长度
	 */
	static valueToPosition(value, minValue, maxValue, trackLength, thumbLength) {
		let result = 0;
		let effectLength = trackLength;
		
		result = (value - minValue) / (maxValue - minValue) * effectLength;
		return NumberUtil.limit(result, 0, effectLength);
	}
}
export default SliderUtil;