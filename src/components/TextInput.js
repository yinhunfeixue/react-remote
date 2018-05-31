import SkinableComponent from './SkinableComponent';
import TextInputSkin from '../skins/TextInputSkin';
import TextEvent from '../events/TextEvent';
import RemoteEvent from '../events/RemoteEvent';

/**
 * 单行文本输入框
 * 可设置允许输入的字符，可设置错误提示
 * <h2>皮肤结构</h2>
 * <ul>
 *   <li>inputNode 文本输入框，类型必须是 &lt;input type='text'></li>
 * </ul>
 * @example <caption>创建TextInput</caption>
 * //创建一个输入提示：手机号，只允许输入数字的输入框
 * <TextInput ref='tbPhone' restrict='0-9' placeholder='手机号' errorText={this.state.phoneError} />
 * 
 * @example <caption>创建文本框，并获取值</caption>
 * <TextInput ref='tbPhone' restrict='0-9' placeholder='手机号' errorText={this.state.phoneError} />
 * <Button label='获取输入的值' onClick={this.btnClickHandler} />
 * 
 * btnClickHandler = (event) => {
 *   //通过refs获取文本,也可以在onChange事件中获取event.currentTarget.text获取值，并保存到this.state中
 *	 let phone = this.refs.tbPhone.text;
 *	 et phoneError = (phone.length > 0 ? '' : '请输入手机号');
 *	 this.setState({phoneError: phoneError});
 *	 if (phoneError.length === 0) {
 *		 console.log(phone);
 *	 }
 * }
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-12 17:08:29
 * 
 * @extends SkinableComponent
 */
class TextInput extends SkinableComponent {

	/**
	 * @inheritdoc
	 */
	_initProperty() {
		super._initProperty();
		this._restrict = null;
		this._maxChars = -1;
		this._editable = true;
		this._displayAsPassword = false;
		this._text = '';
		this._errorText = '';
		this._changeHandler = null;
		this._enterHandler = null;
		this._blurHandler = null;
		this._focusHandler = null;
		this._placeholder = '';
	}

	/**
	 * 
	 * @type {}
	 * @default 
	 */
	get enable() {
		return this._enable;
	}
	set enable(value) {
		if (this.enable !== value) {
			if (this.inputNode) {
				this.inputNode.disabled = value ? '' : 'true';
			}
			super.enable = value;
		}
	}

	/**
	 * 用户填写输入字段的提示
	 * @default ''
	 * @memberof TextInput
	 */
	get placeholder() {
		return this._placeholder;
	}
	set placeholder(value) {
		if (this._placeholder !== value) {
			this._placeholder = value;
			this.inputNode.placeholder = value;
		}
	}

	/**
	 * @inheritdoc
	 */
	_getDefaultSKinClass() {
		return TextInputSkin;
	}

	/**
	 * @private
	 */
	_adaptText(newText = null) {
		//如果未设置newText，则使用当前值进行计算
		if (newText === null) {
			newText = this._text;
		}

		if (newText != null && newText.length > 0) {
			//检查正则匹配，删除不匹配的字符
			if (this._restrict != null) {
				let regString = '[' + (this._restrict[0] === '^' ? this._restrict.substring(1) : '^' + this._restrict) + ']';
				let reg = new RegExp(regString, 'g');
				newText = newText.replace(reg, '');
			}

			//检查长度
			if (this._maxChars >= 0 && newText.length > this._maxChars) {
				newText = newText.substring(0, this._maxChars);
			}
		}

		if (this._text !== newText) {
			let oldText = this._text;
			this._text = newText;
			this.forceUpdate();
			this.dispatchEvent(new TextEvent(TextEvent.TEXT_CHANGE, this._text, oldText));
		}

		if (this.inputNode != null) {
			this.inputNode.value = this._text;
		}
	}

	/**
	 * 文本变化事件的处理函数，事件类型:{@link TextEvent#TEXT_CHANGE}
	 * @default null;
	 * @type {function}
	 */
	get changeHandler() {
		return this._changeHandler;
	}

	set changeHandler(value) {
		if (this._changeHandler !== value) {
			this._changeEventListener(TextEvent.TEXT_CHANGE, value, this._changeHandler);
			this._changeHandler = value;
		}
	}

	/**
	 * 输入回车键的处理函数，事件类型:{@link RemoteEvent#ENTER}
	 * @default null
	 */
	get enterHandler() {
		return this._enterHandler;
	}

	set enterHandler(value) {
		if (this._enterHandler !== value) {
			this._changeEventListener(RemoteEvent.ENTER, value, this._enterHandler);
			this._enterHandler = value
		}
	}

	/**
	 * 强制获得焦点
	 */
	focus() {
		if (this.inputNode) {
			this.inputNode.focus();
		}
	}

	/**
	 * 强制失去焦点
	 */
	blur() {
		if (this.inputNode) {
			this.inputNode.blur();
		}
	}

	/**
	 * 文本框获得焦点事件
	 * @type {function}
	 * @default null;
	 */
	get focusHandler() {
		return this._focusHandler;
	}
	set focusHandler(value) {
		if (this._focusHandler !== value) {
			this._changeEventListener(RemoteEvent.FOCUS, value, this._focusHandler);
			this._focusHandler = value;
		}
	}

	/**
	 * 文本框失去焦点事件
	 * @listens RemoteEvent:BLUR
	 * @type {function}
	 * @default null;
	 */
	get blurHandler() {
		return this._blurHandler;
	}
	set blurHandler(value) {
		if (this._blurHandler !== value) {
			this._changeEventListener(RemoteEvent.BLUR, value, this._blurHandler);
			this._blurHandler = value;
		}
	}

	/**
	 * 错误提示文本
	 * 
	 * @default ''
	 * @type {string}
	 */
	get errorText() {
		return this._errorText;
	}

	set errorText(value) {
		if (this._errorText !== value) {
			this._errorText = value;
			this.forceUpdate();
		}
	}

	/**
	 * HTML的输入框，在皮肤类中定义，ref='inputNode'
	 */
	get inputNode() {
		return this.findSkinPart('inputNode');
	}

	/**
	 * 指示用户可输入到文本字段中的字符集
	 * restrict 属性的值为一串字符，只能在文本字段中输入该字符串中的字符。从左向右扫描该字符串。可以使用连字符 (-) 指定一个范围。
	 * 例如0-9，可输入数字， ^a-z表示可输入小写字母之外的所有字符
	 * @type {string}
	 */
	get restrict() {
		return this._restrict;
	}

	set restrict(value) {
		if (value !== this._restrict) {
			this._restrict = value;
			this._adaptText();
		}
	}

	/**
	 * 允许输入的最大字符数量,-1表示不限制
	 * 
	 * @default -1
	 * @type {Number}
	 */
	get maxChars() {
		return this._maxChars;
	}

	set maxChars(value) {
		if (value !== this._maxChars) {
			this._maxChars = value;
			this._adaptText();
		}
	}

	/**
	 * 是否可编辑
	 * 
	 * @default true
	 * @type {boolean}
	 */
	get editable() {
		return this._editable;
	}

	set editable(value) {
		if (value !== this._editable) {
			this._editable = value;
			if (this.inputNode != null) {
				this.inputNode.readOnly = this._editable ? '' : 'true';
			}
		}
	}

	/**
	 * 设置或者输入的文本内容。
	 * 此属性，会受到maxChar、restrict的影响。例如，设置maxChar=5，text='123456'，则最终的结果是text='12345'
	 * @default ''
	 * @type {string}
	 */
	get text() {
		return this._text;
	}

	set text(value) {
		if (value === null) {
			value = "";
		}
		this._adaptText(value);
	}

	/**
	 * 是否显示为密码
	 * @default false
	 * @type {boolean}
	 */
	get displayAsPassword() {
		return this._displayAsPassword;
	}

	set displayAsPassword(value) {
		if (value !== this._displayAsPassword) {
			this._displayAsPassword = value;
			if (this.inputNode != null) {
				this.inputNode.type = this._displayAsPassword ? 'password' : 'text';
			}
		}
	}

	/**
	 * @inheritdoc
	 */
	_initSkin() {
		if (this.inputNode != null) {
			this.inputNode.addEventListener('input', this.inputNodeChangeHandler);
			this.inputNode.addEventListener('keydown', this._inputNodeKeyDownHandler);
			this.inputNode.addEventListener('blur', this._inputNodeBlurHandler);
			this.inputNode.addEventListener('focus', this._inputNodeFocusHandler);
			this.inputNode.type = this._displayAsPassword ? 'password' : 'text';
			this.inputNode.readOnly = this._editable ? '' : 'true';
			this.inputNode.disabled = this._enable ? '' : 'true';
			this._adaptText();
		}
	}

	/**
	 * @inheritdoc
	 */
	_unstallSkin() {
		if (this.inputNode != null) {
			this.inputNode.removeEventListener('input', this.inputNodeChangeHandler);
			this.inputNode.removeEventListener('keydown', this._inputNodeKeyDownHandler);
			this.inputNode.removeEventListener('blur', this._inputNodeBlurHandler);
			this.inputNode.removeEventListener('focus', this._inputNodeFocusHandler);
		}
		super._unstallSkin();
	}
	/**
	 * @private
	 */
	_inputNodeBlurHandler = (event) => {
		this.dispatchEvent(new RemoteEvent(RemoteEvent.BLUR));
	}

	/**
	 * @private
	 */
	_inputNodeFocusHandler = (event) => {
		this.dispatchEvent(new RemoteEvent(RemoteEvent.FOCUS));
	}

	/**
	 * @private
	 */
	_inputNodeKeyDownHandler = (event) => {
		if (event.keyCode === 13) {
			this.dispatchEvent(new RemoteEvent(RemoteEvent.ENTER));
		}
	}

	/**
	 * @private
	 */
	inputNodeChangeHandler = (event) => {
		//如果是组合输入，且内容只有英文字母，表示未输入完成，不处理
		//（因为IOS自带输入法在输入汉字时，会把先输入的字母也放到输入框中
		if (event.inputType === 'insertCompositionText' && event.data && !/[\u4e00-\u9fa5]/.test(event.data)) {
			return;
		}
		else {
			this.text = this.inputNode.value;
		}
	}
}

export default TextInput;