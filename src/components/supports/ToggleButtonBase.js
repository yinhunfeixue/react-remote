import ButtonBase from './ButtonBase';
import Skin from '../../skins/ToggleButtonSkin';
import RemoteEvent from '../../events/RemoteEvent';
/**
 * 选中状态可切换的按钮基类
 * 
 * @extends ButtonBase
 * @date    2017-09-06 15:38:02
 */
class ToggleButtonBase extends ButtonBase {

	_initProperty() {
		super._initProperty();
		this._selected = false;
		this._changeHandler = null;
	}

	/**
	 * @inheritdoc
	 */
	_getDefaultSKinClass() {
		return Skin;
	}

	/**
	 * 获取皮肤状态
	 * @property '' 普通状态
	 * @property unable 不可用的状态
	 * @property down 鼠标/手指 按下的状态
	 * @property over 鼠标移上但是未按下的状态（移动端无此状态）
	 * @property selected 选中状态
	 * @property down-selected 选中后，鼠标/手指 按下的状态
	 * @property over-selected 选中后，鼠标移上但是未按下的状态（移动端无此状态）
	 * @property unable-selected 选中且不可用状态
	 */
	_getCurrentSkinStatus() {
		let result = [];
		let superStatus = super._getCurrentSkinStatus();
		if (superStatus)
			result.push(superStatus);

		if (this.selected) {
			result.push('selected');
		}
		return result.join('-');
	}

	/**
	 * 是否选中
	 * @type {boolean}
	 * 
	 * @default false
	 */
	get selected() {
		return this._selected;
	}

	set selected(value) {
		if (value !== this._selected) {
			this._selected = value;
			this._updateSkinStatus();
			this.dispatchEvent(new RemoteEvent(RemoteEvent.CHANGE));
		}
	}

	/**
	 * 选中状态发生变化时触发的事件函数，事件类型{@link Event#CHANGE}
	 *
	 * @default null
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
}

export default ToggleButtonBase;

