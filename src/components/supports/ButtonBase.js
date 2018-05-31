/**
 * 
 * 按钮基础类
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/6 下午3:19:09
 */
import SkinableComponent from '../SkinableComponent';
import ButtonSkin from '../../skins/ButtonSkin';
import SystemUtil from '../../utils/SystemUtil';

/**
 * 按钮类，文字不可选中，具有长按功能
 * @extends SkinableComponent
 * @private
 */
class ButtonBase extends SkinableComponent {

	_initProperty() {
		super._initProperty();
		this._label = 'button';
		this._isMouseOver = false;
		this._isMouseDown = false;
		this._selectedAble = false;
	}

	/**
	 * @inheritdoc
	 * 
	 */
	_getDefaultSKinClass() {
		return ButtonSkin;
	}

	/**
	 * @private
	 */
	componentDidMount() {
		if (super.componentDidMount) {
			super.componentDidMount();
		}
		const mouseEvents = ['mouseenter', 'mouseleave', 'mousedown', 'mouseup'];
		const touchEvents = ['touchstart', 'touchend'];

		let useEvents = SystemUtil.isMobile() ? touchEvents : mouseEvents;
		useEvents.forEach((value) => this.rootComponent.addEventListener(value, this.mouseEventHandler.bind(this)), this);
	}

	/**
 	 * @private
 	 */
	mouseEventHandler(event) {
		switch (event.type) {
			case 'mouseenter': {
				this._isMouseOver = true;
				break;
			}
			case 'mouseleave':
			case 'touchend': {
				this._isMouseOver = false;
				this._isMouseDown = false;
				break;
			}
			case 'mousedown': {
				this._isMouseDown = true;
				break;
			}
			case 'touchstart': {
				this._isMouseOver = true;
				this._isMouseDown = true;
				break;
			}
			case 'mouseup': {
				this._isMouseDown = false;
				break;
			}
			default: {
				break;
			}
		}
		this._updateSkinStatus();
	}

	/**
	 * 皮肤状态
	 * 
	 * @property unable 不可用的状态
	 * @property down 鼠标/手指 按下的状态
	 * @property over 鼠标移上但是未按下的状态（移动端无此状态）
	 */
	_getCurrentSkinStatus() {
		if (!this.enable) {
			return 'unable';
		}
		else {
			if (this._isMouseDown) {
				return 'down';
			}
			else if (this._isMouseOver) {
				return 'over';
			}
			else {
				return '';
			}
		}
	}

	/**
	 * 按钮文本
	 * @type {string}
	 * 
	 * @default button
	 */
	get label() {
		return this._label;
	}

	set label(value) {
		this._label = value;
		this.forceUpdate();
	}
}
export default ButtonBase;