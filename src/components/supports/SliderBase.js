import SkinableComponent from '../SkinableComponent';
import Point from '../../core/Point';
import HtmlUtil from '../../utils/HtmlUtil';
import NumberUtil from '../../utils/NumberUtil';
import RemoteEvent from '../../events/RemoteEvent';
/**
 * 滑块基类
 * 
 * <h3>皮肤部件</h3>
 * <ol>
 * 	<li>track 轨道</li>
 * 	<li>thumb 滑块</li>
 * </ol>
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/9 下午2:44:08
 * 
 * @extends SkinableComponent
 */
class SliderBase extends SkinableComponent {

	/**
	 * 相对于轨道的显示坐标点转换为滑块值
	 * @param {Point} point 相对轨道的坐标点
	 * 
	 * @return {Number} 对应的滑块值
	 * 
	 * @protected
	 */
	_pointToValue(point) {

	}

	/**
	 * 滑块值转换为相对于轨道的坐标点
	 * 
	 * @return {Point} 相对轨道的坐标点
	 * 
	 * @protected
	 */
	_valueToPoint() {

	}

	/**
	 * 滑块最大值
	 * 
	 * @type {number}
	 * @default 100
	 * @memberof SliderBase
	 */
	get maxValue() {
		return this._maxValue;
	}

	set maxValue(v) {
		if (this._maxValue !== v) {
			this._maxValue = v;
			this.value = NumberUtil.limit(this.value, this._minValue, this._maxValue);
		}
	}

	/**
	 * 滑块最小值
	 * 
	 * @type {number}
	 * @default 0
	 * @memberof SliderBase
	 */
	get minValue() {
		return this._minValue;
	}

	set minValue(v) {
		if (this._minValue !== v) {
			this._minValue = v;
			this.value = NumberUtil.limit(this.value, this._minValue, this._maxValue);
		}
	}

	/**
	 * 滑块当前值
	 * 
	 * @type {number}
	 * @default 0
	 * @memberof SliderBase
	 */
	get value() {
		return this._value;
	}

	set value(v) {
		v = NumberUtil.limit(v, this._minValue, this._maxValue);
		if (this._value !== v) {
			this._value = v;
			this._updateThumbPosition();
			this.dispatchEvent(new RemoteEvent(RemoteEvent.CHANGE));
			this.forceUpdate();
		}
	}

	/**
	 * 皮肤部件：滑块
	 * 
	 * @readonly
	 * @memberof SliderBase
	 */
	get thumb() {
		return this.findSkinPart('thumb');
	}

	/**
	 * 皮肤部件：滑轨
	 */
	get track() {
		return this.findSkinPart('track');
	}

	/**
	 * @inheritdoc
	 */
	_initProperty() {
		super._initProperty();
		this._minValue = 0;
		this._maxValue = 100;
		this._value = 0;
		this._stepSize = 1;
		this._mouseDownPoint = null;
		this._changeHandler = null;
		this._moving = false;
	}

	/**
	 * 步进值，滑块值最小变化单位
	 * 
	 * @type {number}
	 * @default 1
	 * @memberof SliderBase
	 */
	get stepSize() {
		return this._stepSize;
	}

	set stepSize(value) {
		if (value !== this._stepSize) {
			this._stepSize = value;
			this._updateThumbPosition();
		}
	}

	/**
	 * value发生变化时触发的函数，事件类型 {@link RemoteEvent#CHANGE}
	 * 
	 * @type {function}
	 */
	get changeHandler() {
		return this._changeHandler;
	}

	set changeHandler(value) {
		if (this._changeHandler !== value) {
			this._changeEventListener(RemoteEvent.CHANGE, value, this._changeHandler);
			this._changeHandler = value;
		}
	}

	/**
	 * 更新滑块位置
	 * @private
	 */
	_updateThumbPosition() {
		if (this.inited && this.thumb) {
			let positon = this._valueToPoint();
			this.thumb.style.left = positon.x + 'px';
			this.thumb.style.top = positon.y + 'px';
		}
	}

	/**
	 * @private
	 */
	_thumbMouseDownHandler = (event) => {
		if (this.enable) {
			this._moving = true;
			this._updateSkinStatus();
			this._mouseDownPoint = new Point(event.pageX, event.pageX);
			document.addEventListener('mousemove', this._thumbMouseMoveHandler);
			document.addEventListener('mouseup', this._thumbMouseUpHandler);
		}
	}

	/**
	 * @private
	 */
	_thumbMouseMoveHandler = (event) => {
		if (this.enable) {
			let point = HtmlUtil.globalToLocal(new Point(event.pageX, event.pageY), this.track);
			this.value = this._pointToValue(point);
		}
	}

	/**
	 * @private
	 */
	_thumbMouseUpHandler = (event) => {
		this._moving = false;
		this._updateSkinStatus();
		document.removeEventListener('mousemove', this._thumbMouseMoveHandler);
		document.removeEventListener('mouseup', this._thumbMouseUpHandler);
	}

	/**
	 * @inheritdoc
	 */
	_initSkin() {
		super._initSkin();
		if (this.thumb != null) {
			this.thumb.style.position = 'absolute';
			this.thumb.addEventListener('mousedown', this._thumbMouseDownHandler);
		}
		if (this.track) {
			this.track.style.position = 'relative';
		}
		this._updateThumbPosition();
	}

	/**
	 * @inheritdoc
	 */
	_unstallSkin() {
		if (this.thumb != null) {
			this.thumb.removeEventListener('mousedown', this._thumbMouseDownHandler);
		}
		document.removeEventListener('mousemove', this._thumbMouseMoveHandler);
		document.removeEventListener('mouseup', this._thumbMouseUpHandler);
		super._installSkin();
	}

	/**
	 * 当前皮肤状态
	 * 
	 * @property {string} unable 组件不可用状态
	 * @property {string} moving 移动状态
	 */
	_getCurrentSkinStatus() {
		let result = [];
		let superStatus = super._getCurrentSkinStatus();
		if (superStatus)
			result.push(superStatus);

		if (this._moving) {
			result.push('moving');
		}
		return result.join('-');
	}
}
export default SliderBase;