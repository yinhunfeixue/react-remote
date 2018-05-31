import ButtonBase from './supports/ButtonBase';

/**
 * Button 组件是常用的矩形按钮，Button 组件看起来可以按压，可设置长按功能
 * 
 * @example <caption>创建基本按钮</caption>
 * <Button label='按钮' />
 * 
 * @example <caption>设置长按功能并自定义自动点击间隔时间</caption>
 * <Button label='按钮' autoRepeatClick={true} repeatIntervalTime={200} onClick={(event)=>{
 * 	//your code
 * }}/>
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/1 下午3:47:50
 * @extends ButtonBase
 */
class Button extends ButtonBase {

	/**
	 * @inheritdoc
	 */
	_initProperty() {
		super._initProperty();
		this._autoRepeatClick = false
		this._repeatIntervalTime = 200;
		this._repeatIntervalID = NaN;
	}

	/**
 	 * @private
 	 */
	mouseEventHandler(event) {
		super.mouseEventHandler(event);
		this._checkAutoReapt();
	}

	/**
	 * @private
	 */
	_checkAutoReapt() {
		if (this.enable && this._autoRepeatClick && this._isMouseDown && this._isMouseOver) {
			this._startRepeatClick();
		}
		else {
			this._stopRepeatClick();
		}
	}

	/**
	 * @private
	 */
	_startRepeatClick() {
		if (isNaN(this._repeatIntervalID)) {
			this._repeatIntervalID = setInterval(this._autoClick.bind(this), this._repeatIntervalTime);
		}
	}
	/**
	 * @private
	 */
	_stopRepeatClick() {
		clearInterval(this._repeatIntervalID);
		this._repeatIntervalID = NaN;
	}
	/**
	 * @private
	 */
	_autoClick() {
		let event = window.document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		this.rootComponent.dispatchEvent(event);
	}

	/**
	 * 按钮长按时，是否自动点击
	 * @type {boolean}
	 * @default false
	 */
	get autoRepeatClick() {
		return this._autoRepeatClick;
	}

	set autoRepeatClick(value) {
		this._autoRepeatClick = value;
	}

	/**
	 * 按钮长按时，自动点击的间隔时间（毫秒）
	 * 此值最小值为50，如果小于此值，将被设置为50
	 * @type {number}
	 * @default 200
	 */
	get repeatIntervalTime() {
		return this._repeatIntervalTime;
	}

	set repeatIntervalTime(value) {
		if (value < 50)
			value = 50;
		this._repeatIntervalTime = value;
	}
}

export default Button;