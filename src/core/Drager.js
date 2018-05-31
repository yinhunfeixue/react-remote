import HtmlUtil from '../utils/HtmlUtil';
import Point from './Point';
import EventDispatcher from '../core/EventDispatcher';
import MoveEvent from '../events/MoveEvent';
/**
 * 拖动控制类，通过指定鼠标响应对象、被拖动对象，可让鼠标在鼠标响应对象上移动时，被拖动对象同步移动
 * <b>请注意，拖动控制的是left、top的值，因此，只能left、top生效的布局模式（例如fixed, position），拖动功能才有效</b>
 * 
 * 可选是否允许拖到浏览器窗口外面
 * 可设置允许拖动的范围
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-25 15:21:13
 */
class Drager extends EventDispatcher {

	constructor() {
		super();
		this._enable = true;
		this._draging = false;
		this._minLeft = NaN;
		this._maxLeft = NaN;
		this._minTop = NaN;
		this._maxTop = NaN;
	}

	/**
	 * 是否正在拖动
	 * @type {boolean}
	 * 
	 * @readonly
	 */
	get draging() {
		return this._draging;
	}

	/**
	 * 是否生效。把此属性设置为false，可暂停拖动
	 * 
	 * @default true
	 */
	get enable() {
		return this._enable;
	}
	set enable(value) {
		if (this._enable !== value) {
			this._enable = value
		}
	}


	/**
	 * 给指定的显示对象绑定拖动功能。
	 * 通常，响应鼠标事件的对象和被拖动的对对象相同；但也支持，A对象响应鼠标事件，被拖动的是B对象
	 * @param {htmlElement} target 响应鼠标事件的对象
	 * @param {htmlElement} displayTarget 被拖动位置的对象，默认为null,表示和target相同
	 * @param {boolean} outAble 是否允许拖出窗口范围，默认为false,表示不允许拖到窗口外
	 * @param {Number} minLeft 拖动时，水平方向最小值，默认为NaN表示不限制
	 * @param {Number} maxLeft 拖动时，水平方向最大值，默认为NaN表示不限制
	 * @param {Number} minTop 拖动时，竖直方向最小值，默认为NaN表示不限制
	 * @param {Number} maxTop 拖动时，竖直方向最大值，默认为NaN表示不限制
	 */
	bind(target, displayTarget = null, outAble = false, minLeft = NaN, maxLeft = NaN, minTop = NaN, maxTop = NaN) {
		if (target === null) {
			throw new RangeError('taget 不能为null');
		}

		if (displayTarget === null) {
			displayTarget = target;
		}
		this.outAble = outAble;
		this._minLeft = minLeft;
		this._maxLeft = maxLeft;
		this._minTop = minTop;
		this._maxTop = maxTop;
		//如果新的绑定对象和已绑定的对象相同，则只改变被拖动的显示对象
		if (this.target === target) {
			this.displayTarget = displayTarget;
			return;
		}

		//先移除之前的绑定，再添加新的绑定
		if (this.target != null) {
			this.unbind();
		}

		this.target = target;
		this.displayTarget = displayTarget;
		if (this.target != null) {
			this.target.addEventListener('mousedown', this.targetMouseDownHandler);
			this.target.addEventListener('touchstart', this.targetMouseDownHandler);
			window.addEventListener('resize', this.documentResizeHandler);
		}
	}

	/**
	 * 解除绑定
	 */
	unbind() {
		this._startMousePoint = null;
		this._startTargetPosition = null;
		this.displayTarget = null;
		if (this.target != null) {
			this.target.removeEventListener('mousedown', this.targetMouseDownHandler);
			this.target.removeEventListener('touchstart', this.targetMouseDownHandler);
			this.target = null;
		}
		document.removeEventListener('mousemove', this.documentMouseMoveHandler);
		document.removeEventListener('mouseup', this.documentMouseUpHandler);

		document.removeEventListener('touchmove', this.documentMouseMoveHandler);
		document.removeEventListener('touchend', this.documentMouseUpHandler);

		window.removeEventListener('resize', this.documentResizeHandler);
	}

	/**
	 * @private
	 */
	documentResizeHandler = (event) => {
		let position = HtmlUtil.getLeftTop(this.displayTarget);
		this.adptePosition(position.x, position.y);
	}

	/**
	 * @private
	 */
	targetMouseDownHandler = (event) => {
		if (!this.enable) {
			return;
		}
		this._startMousePoint = HtmlUtil.getMouseEventPosition(event);
		if (this._startMousePoint != null) {
			this._startTargetPosition = HtmlUtil.getLeftTop(this.displayTarget);
			document.addEventListener('mousemove', this.documentMouseMoveHandler);
			document.addEventListener('mouseup', this.documentMouseUpHandler);

			document.addEventListener('touchmove', this.documentMouseMoveHandler);
			document.addEventListener('touchend', this.documentMouseUpHandler);
			this._draging = true;
			if (this.hasEventListener(MoveEvent.MOVE_START)) {
				this.dispatchEvent(new MoveEvent(MoveEvent.MOVE_START, this._startTargetPosition.x, this._startTargetPosition.y));
			}
		}
	}

	/**
	 * @private
	 */
	documentMouseMoveHandler = (event) => {
		if (!this.enable) {
			return;
		}
		let point = this._updatepositonByEvent(event);
		if (point && this.hasEventListener(MoveEvent.MOVEING)) {
			this.dispatchEvent(new MoveEvent(MoveEvent.MOVEING, point.x, point.y));
		}
	}

	_updatepositonByEvent(event) {
		let point = HtmlUtil.getMouseEventPosition(event);
		if (point != null) {
			let endPosition = point.subPoint(this._startMousePoint).addPoint(this._startTargetPosition);
			return this.adptePosition(endPosition.x, endPosition.y);
		}
		return null;
	}

	/**
	 * @private
	 */
	documentMouseUpHandler = (event) => {
		if (!this.enable) {
			return;
		}
		this._draging = false;
		let point = this._updatepositonByEvent(event);
		if (point && this.hasEventListener(MoveEvent.MOVE_END)) {
			this.dispatchEvent(new MoveEvent(MoveEvent.MOVE_END, point.x, point.y));
		}
		document.removeEventListener('mousemove', this.documentMouseMoveHandler);
		document.removeEventListener('mouseup', this.documentMouseUpHandler);

		document.removeEventListener('touchmove', this.documentMouseMoveHandler);
		document.removeEventListener('touchend', this.documentMouseUpHandler);
	}

	/**
	 * @private
	 */
	adptePosition(x, y) {
		if (this.displayTarget) {
			this.displayTarget.style.left = x + 'px';
			this.displayTarget.style.top = y + 'px';

			let realPosition = new Point(x, y);
			//如果不能超出屏幕范围，则判断差值，并设置left,top
			if (!this.outAble) {
				let rectangle = HtmlUtil.getRectangleToWindow(this.displayTarget);
				let windowRectangle = HtmlUtil.getWindowRectangle();
				let beyondX = rectangle.right - windowRectangle.width;
				let beyondY = rectangle.bottom - windowRectangle.height;


				if (beyondX > 0) {
					realPosition.x = realPosition.x - beyondX;
				}
				if (beyondY > 0) {
					realPosition.y = realPosition.y - beyondY;
				}
				if (rectangle.x < 0) {
					realPosition.x = realPosition.x + (-rectangle.x);
				}
				if (rectangle.y < 0) {
					realPosition.y = realPosition.y + (-rectangle.y);
				}
			}

			//如果设置了可拖动范围同，则限制在范围内
			if (this._minLeft != null && !isNaN(this._minLeft) && realPosition.x < this._minLeft) {
				realPosition.x = this._minLeft;
			}

			if (this._maxLeft != null && !isNaN(this._maxLeft) && realPosition.x > this._maxLeft) {
				realPosition.x = this._maxLeft;
			}

			if (this._minTop != null && !isNaN(this._minTop) && realPosition.y < this._minTop) {
				realPosition.y = this._minTop;
			}

			if (this._maxTop != null && !isNaN(this._maxTop) && realPosition.y > this._maxTop) {
				realPosition.y = this._maxTop;
			}

			if (realPosition.x !== x || realPosition.y !== y) {
				this.displayTarget.style.left = realPosition.x + 'px';
				this.displayTarget.style.top = realPosition.y + 'px';
			}
			return realPosition;
		}
	}
}

export default Drager;