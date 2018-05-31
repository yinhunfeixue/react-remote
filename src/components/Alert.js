import TitleWindow from './TitleWindow';
import PopupManager from '../manager/PopupManager';
import AlertSkin from '../skins/AlertSkin';
import React from 'react';
import ReactDOM from 'react-dom';
import DataEvent from '../events/DataEvent';
/**
 * 弹出式警告框，可设置显示的按钮以及点击点击按钮关闭后的处理函数
 * 
 * <h3>皮肤部件</h3>
 * <ol>
 * 	<li>buttonOk 确定按钮</li>
 * 	<li>buttonOk 取消按钮</li>
 * </ol>
 * 
 * @example <caption>显示文本内容</caption>
 * Alert.show('标题', '我是一长串文字', this.alerCloseHandler, [Alert.OK, Alert.CANCEL]);
 * 
 * alerCloseHandler = (event) =>{
 *  if(event.data === Alert.OK){
 *   console.log('点击了确认按钮');
 *  }
 *  else if(event.data === Alert.CANCEL){
 *   console.log('点击了取消按钮');
 *  }
 *  else{
 *   console.log('点击了窗口关闭按钮或者通过其它方式关闭');
 *  }
 * }
 * 
 * @example <caption>显示自定义内容</caption>
 * Alert.show('标题', <div><span>我是一个标签</span><a>我是一个链接</a></div>, 
 *    this.alerCloseHandler, [Alert.OK, Alert.CANCEL]);
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-22 08:50:58
 * 
 * @extends TitleWindow
 * 
 */
class Alert extends TitleWindow {

	/**
	 * 显示一个警告框
	 * @param {string} title 窗口标题
	 * @param {any} content 窗口内容，通常是一段文本，也可以是各种组件和其它任何内容
	 * @param {function} closeHandler 事件类型{@link DataEvent#CLOSE}，可根据事件携带的数据判断点击的按钮
	 * @param {array} buttonValues 按钮值数组。每一项应为Alert.OK、Alert.CANCEL之一
	 * @param {array} buttonLabels 按钮文本数组，指定按钮显示的文本，和buttonValues一一对应，如果不设置，则使用默认值
	 */
	static show(title, content, closeHandler, buttonValues, buttonLabels = null) {
		if(buttonValues == null){
			buttonValues = [Alert.OK];
		}
		let alert = <Alert titleText={title} content={content} closeHandler={closeHandler} buttonValues={buttonValues}
			closeFunction={() => {
				PopupManager.removePopUp(alert);
			}}></Alert>;

		PopupManager.addPopUp(alert);
		return alert;
	}


	/**
	 * 表示确定按钮的值
	 * 
	 * @type {number}
	 * @readonly
	 * @static
	 * @memberof Alert
	 */
	static OK = 1;

	/**
	 * 表示取消按钮的值
	 * 
	 * @type {number}
	 * @readonly
	 * @static
	 * @memberof Alert
	 */
	static CANCEL = 2;


	/**
	 * @private
	 */
	static OK_LABEL = '确定';

	/**
	 * @private
	 */
	static CANCEL_LABEL = '取消';

	/**
	 * @inheritdoc
	 */
	_initProperty() {
		super._initProperty();
		this._buttonValues = [];
		this._buttonLabels = [];
		this._minEnable = false;
		this._maxEnable = false;
		this._content = null;
		this._dragEnable = true;
	}

	/**
	 * 警告框内容
	 * @private
	 */
	get content() {
		return this._content;
	}
	set content(value) {
		if (this._content !== value) {
			this._content = value;
			this._renderContent();
		}
	}

	/**
	 * @private
	 */
	_renderContent() {
		if (this._content) {
			if (this.contentContainer) {
				ReactDOM.render(<span>{this._content}</span>, this.contentContainer);
			}
		}
		else {
			super._renderContent();
		}
	}

	/**
	 * @private
	 */
	get buttonValues() {
		return this._buttonValues;
	}
	set buttonValues(value) {
		this._buttonValues = value;
		this.forceUpdate();
	}

	/**
	 * @inheritdoc
	 */
	_getDefaultSKinClass() {
		return AlertSkin;
	}

	/**
	 * @inheritdoc
	 */
	_initSkin() {
		super._initSkin();
		this._renderControl();
	}

	_unstallSkin() {
		if (this.buttonOk) {
			this.buttonOk.rootComponent.removeEventListener('click', this.btnOkClickHandler);
		}
		if (this.buttonCancel) {
			this.buttonCancel.rootComponent.removeEventListener('click', this.btnCancelClickHandler);
		}

		super._unstallSkin();
	}
	/**
	 * @private
	 */
	_renderControl() {
		//更新按钮
		if (this.buttonOk) {
			this.buttonOk.style.display = 'none';
			this.buttonOk.rootComponent.addEventListener('click', this.btnOkClickHandler);
		}
		if (this.buttonCancel) {
			this.buttonCancel.style.display = 'none';
			this.buttonCancel.rootComponent.addEventListener('click', this.btnCancelClickHandler);
		}
		for (let i = 0; i < this._buttonValues.length; i++) {
			let btn = null;
			switch (this._buttonValues[i]) {
				case Alert.OK:
					btn = this.buttonOk;
					break;
				case Alert.CANCEL:
					btn = this.buttonCancel;
					break;
				default:
					break;
			}

			if (btn != null) {
				btn.style.display = '';
				btn.label = this._getButtonLabel(i);
			}
		}
	}

	_closeButtonClickHandler = (event) => {
		this._close(null);
	}

	btnOkClickHandler = (event) => {
		this._close(Alert.OK);
	}

	btnCancelClickHandler = (event) => {
		this._close(Alert.CANCEL);
	}

	_close(value) {
		if (this.props.closeFunction) {
			this.props.closeFunction();
		}
		this.dispatchEvent(new DataEvent(DataEvent.CLOSE, value));
	}

	/**
	 * @private
	 */
	_getButtonLabel(index) {
		if (this._buttonLabels != null && this._buttonLabels.length > index) {
			return this._buttonLabels[index];
		}
		else {
			switch (this._buttonValues[index]) {
				case Alert.OK:
					return Alert.OK_LABEL;
				case Alert.CANCEL:
					return Alert.CANCEL_LABEL;
				default:
					return '按钮';
			}
		}
	}

	/**
	 * 皮肤部件，确定按钮
	 * 
	 * @type {HtmlNode}
	 */
	get buttonOk() {
		return this.findSkinPart('buttonOk');
	}

	/**
	 * 皮肤部件，取消按钮
	 * 
	 * @type {HtmlNode}
	 */
	get buttonCancel() {
		return this.findSkinPart('buttonCancel');
	}
}

export default Alert;