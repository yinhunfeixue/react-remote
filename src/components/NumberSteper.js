import SkinableComponent from './SkinableComponent';
import NumberUtil from '../utils/NumberUtil';
import NumberSteperSkin from '../skins/NumberSteperSkin';
import Button from './Button';
import RemoteEvent from '../events/RemoteEvent';
/**
 * 步进组件，允许用户从有序集中选择值，包括一个单行输入文本字段和一对用于逐一显示可能值的箭头按钮。
 * 还可使用向上箭头键和向下箭头键遍历这些值
 * 
 * refs
 * <ol>
 * 	<li>upButton  值增加的按钮  推荐类型:{@link Button}</li>
 *  <li>downButton 值减少的按钮  推荐类型:{@link Button}</li>
 * 	<li>inputNode 输入框 类型:{@link TextInput} </li>
 * </ol>
 * 
 * @extends SkinableComponent
 * @date   : 2017-9-18 09:31:40
 */
class NumberSteper extends SkinableComponent {

	/**
	 * @inheritdoc
	 */
	_initProperty() {
		super._initProperty();
		this._value = 0;
		this._stepSize = 1;
		this._minValue = 0;
		this._maxValue = 100;
	}
	_getDefaultSKinClass() {
		return NumberSteperSkin;
	}

	/**
	 * 步进值，必须大于0，如果设置小于0的值，将被设置为1
	 */
	get stepSize() {
		return this._stepSize;
	}

	set stepSize(value) {
		if (value <= 0) {
			value = 1;
		}
		this._stepSize = value;
	}

	/**
	 * 当前值
	 */
	get value() {
		return this._value;
	}

	set value(v) {
		let effectV = NumberUtil.limit(v, this._minValue, this._maxValue);
		if (effectV !== this._value) {
			this._value = effectV;
			this.dispatchEvent(new RemoteEvent(RemoteEvent.CHANGE));
		}
		if (this.inputText) {
			this.inputText.text = this._value.toString();
		}
	}

	/**
	 * 允许的最小值
	 * @type {number}
	 */
	get minValue() {
		return this._minValue;
	}

	set minValue(value) {
		this._minValue = value;
		this.value = NumberUtil.limit(this.value, this._minValue, this._maxValue);
	}

	/**
	 * 允许的最大值
	 * @type {number}
	 */
	get maxValue() {
		return this._maxValue;
	}

	set maxValue(value) {
		this._maxValue = value;
		this.value = NumberUtil.limit(this.value, this._minValue, this._maxValue);
	}

	get upButton() {
		return this.findSkinPart('upButton');
	}

	get downButton() {
		return this.findSkinPart('downButton');
	}

	get inputText() {
		return this.findSkinPart('inputText');
	}

	/**
	 * @inheritdoc
	 */
	_initSkin() {
		super._initSkin();
		this._updateChildrenEnable();
		if (this.upButton != null) {
			if (this.upButton instanceof Button) {
				this.upButton.autoRepeatClick = true;
			}
			let eventTarget = (this.upButton instanceof Button ? this.upButton.rootComponent : this.upButton);
			eventTarget.addEventListener('click', this._upButtonClickHandler);
		}
		if (this.downButton != null) {
			if (this.downButton instanceof Button) {
				this.downButton.autoRepeatClick = true;
			}
			let eventTarget = (this.downButton instanceof Button ? this.downButton.rootComponent : this.downButton);
			eventTarget.addEventListener('click', this._downButtonClickHandler);
		}
		if (this.inputText) {
			this.inputText.addEventListener(RemoteEvent.BLUR, this._inputTextChangeHandler);

			this.inputText.text = this._value.toString();
			this.inputText.restrict = '0-9.-';
		}
	}

	/**
	 * 
	 * @type {}
	 * @default 
	 */
	get enable() {
		return super.enable;
	}
	set enable(value) {
		if (this._enable !== value) {
			super.enable = value;
			this._updateChildrenEnable();
		}
	}

	_updateChildrenEnable() {
		if (this.upButton) {
			this.upButton.enable = this.enable;
		}
		if (this.downButton) {
			this.downButton.enable = this.enable;
		}
		if (this.inputText) {
			this.inputText.enable = this.enable;
		}
	}

	/**
	 * @private
	 */
	_upButtonClickHandler = (event) => {
		this.value += this.stepSize;
	}

	/**
	 * @private
	 */
	_downButtonClickHandler = (event) => {
		this.value -= this.stepSize;
	}

	/**
	 * @private
	 */
	_inputTextChangeHandler = (event) => {

		let number = (Number)(event.currentTarget.text);
		if (isNaN(number)) {
			this.inputText.text = this.value;
		}
		else if (this.value !== number) {
			this.value = number;
		}
	}
}

export default NumberSteper;