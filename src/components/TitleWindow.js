import SkinableComponent from './SkinableComponent';
import ReactDOM from 'react-dom';
import TitleWindowSkin from '../skins/TitleWindowSkin';
import DataEvent from '../events/DataEvent';
import Drager from '../core/Drager';

/**
 * 带标题栏的窗口
 * 
 * <h3>皮肤部件</h3>
 * <ol>
 * 	<li>contentContainer  内容容器</li>
 *  <li>buttonContainer   标题档按钮容器</li>
 *  <li>titleLabel  显示标题文字的元素</li>
 * 	<li>moveArea 可响应拖动窗口的对象</li>
 * <ol>
 * 
 * @date:2017-9-22 08:57:18
 * 
 * @extends SkinableComponent
 */
class TitleWindow extends SkinableComponent {

	/**
	 * @enum {int} 表示正常尺寸
	 * 
	 */
	static SIZE_NORMAL = 1;

	/**
	 * @enum {int} 表示窗口最大化
	 */
	static SIZE_MAX = 2;

	/**
	 * @enum {int} 表示窗口最小化
	 */
	static SIZE_MIN = 3;

	/**
	 * @inheritdoc
	 */
	_initProperty() {
		super._initProperty();
		this._titleText = 'windowTitle';
		this._minEnable = true;
		this._closeEnable = true;
		this._maxEnable = true;
		this._closeButtonSkin = null;
		this._minButtonSkin = null;
		this._maxButtonSkin = null;
		this._closeHandler = null;
		this._dragEnable = false;
		this._beforeDragPositon = null;
		this._drager = new Drager();

		this._sizeState = TitleWindow.SIZE_NORMAL;
	}

	/**
	 * 设置是否可拖动
	 * 如果允许拖动，窗口的position将被设置成absolute
	 * @type {boolean}
	 * @default false
	 */
	get dragEnable() {
		return this._dragEnable;
	}
	set dragEnable(value) {
		if (this._dragEnable !== value) {
			this._dragEnable = value;
			this._updateDrager();
		}
	}

	/**
	 * @private
	 */
	_updateDrager() {
		if (this._dragEnable) {
			if (this.moveArea && this.container) {
				if (this._beforeDragPositon === null) {
					this._beforeDragPositon = this.container.style.position;
				}
				this.moveArea.style.cursor = 'move';
				this.container.style.position = 'absolute';
				this._drager.bind(this.moveArea, this.container);
			}
		}
		else {
			if (this.container) {
				this.container.style.position = this._beforeDragPositon;
			}
			if (this.moveArea) {
				this.moveArea.style.cursor = '';
			}
			this._drager.unbind();
		}
	}
	/**
	 * 窗口关闭时执行的函数
	 * 事件类型{@link DataEvent#CLOSE}，可根据事件携带的数据判断点击的按钮
	 * @type {function}
	 * 
	 * @default null
	 */
	get closeHandler() {
		return this._closeHandler;
	}

	set closeHandler(value) {
		if (this.closeHandler !== value) {
			this._changeEventListener(DataEvent.CLOSE, value, this._closeHandler);
			this._closeHandler = value;
		}
	}

	/**
	 * 关闭按钮的皮肤类
	 * @type {class}
	 */
	get closeButtonSkin() {
		return this._closeButtonSkin;
	}

	set closeButtonSkin(value) {
		if (this._closeButtonSkin !== value) {
			this._closeButtonSkin = value;
			this.forceUpdate();
		}
	}

	/**
	 * 最小化按钮的皮肤类
	 * @type {class}
	 */
	get minButtonSkin() {
		return this._minButtonSkin;
	}
	set minButtonSkin(value) {
		if (this._minButtonSkin !== value) {
			this._minButtonSkin = value;
			this.forceUpdate();
		}
	}

	/**
	 * 最大化按钮的皮肤类
	 * @type {class}
	 */
	get maxButtonSkin() {
		return this._maxButtonSkin;
	}
	set maxButtonSkin(value) {
		if (this._maxButtonSkin !== value) {
			this._maxButtonSkin = value;
			this.forceUpdate();
		}
	}

	/**
	 * 是否可最小化
	 * @type {boolean}
	 */
	get minEnable() {
		return this._minEnable;
	}
	set minEnable(value) {
		if (value !== this._minEnable) {
			this._minEnable = value;
			this._renderTitle();
		}
	}

	/**
	 * 是否可关闭
	 * @type {boolean}
	 */
	get closeEnable() {
		return this._closeEnable;
	}
	set closeEnable(value) {
		if (value !== this._closeEnable) {
			this._closeEnable = value;
			this._renderTitle();
		}
	}

	/**
	 * 是否可最大化
	 * @type {boolean}
	 */
	get maxEnable() {
		return this._maxEnable;
	}
	set maxEnable(value) {
		if (value !== this._maxEnable) {
			this._maxEnable = value;
			this._renderTitle();
		}
	}

	/**
	 * 窗口标题
	 * @type {string}
	 * 
	 * @default 'windowTitle'
	 */
	get titleText() {
		return this._titleText;
	}

	set titleText(value) {
		if (this._titleText !== value) {
			this._titleText = value;
			this._renderTitle();
		}
	}

	/**
	 * @inheritdoc
	 */
	_getDefaultSKinClass() {
		return TitleWindowSkin;
	}

	/**
	 * @private
	 */
	get container() {
		return this.findSkinPart('container');
	}

	/**
	 * 内容容器
	 */
	get contentContainer() {
		return this.findSkinPart('contentContainer');
	}

	/**
	 * 可响应窗口拖动的对象
	 */
	get moveArea() {
		return this.findSkinPart('moveArea');
	}

	/**
	 * 显示标题的HTML元素
	 * 
	 */
	get titleLabel() {
		return this.findSkinPart('titleLabel');
	}

	/**
	 * 按钮窗口，用于放置最大化，最小化，关闭等按钮
	 */
	get buttonContainer() {
		return this.findSkinPart('buttonContainer');
	}

	/**
	 * @inheritdoc
	 */
	_initSkin() {
		super._initSkin();

		this._renderTitle();
		this._renderButtons();
		this._renderContent();
		this._updateDrager();
	}

	/**
	 * @private
	 */
	_renderTitle() {
		if (this.titleLabel) {
			this.titleLabel.innerHTML = this._titleText;
		}
	}

	/**
	 * @private
	 */
	_renderContent() {
		if (this.contentContainer && this.props.children) {
			ReactDOM.render(this.props.children, this.contentContainer);
		}
	}

	/**
	 * @inheritdoc
	 */
	_getCurrentSkinStatus() {
		let parentStatus = super._getCurrentSkinStatus();

		let result = [];
		if (parentStatus)
			result.push(parentStatus);

		switch (this._sizeState) {
			case TitleWindow.SIZE_MAX:
				result.push('max');
				break;
			case TitleWindow.SIZE_MIN:
				result.push('min');
				break;
			default:
				break;
		}
		return result.join('-');
	}

	/**
	 * @private
	 */
	_renderButtons() {
		if (this.buttonMin) {
			this.buttonMin.style.display = this._minEnable ? '' : 'none';
			this.buttonMin.rootComponent.onclick = this._minButtonClickHandler;
		}
		if (this.buttonMax) {
			this.buttonMax.style.display = this._maxEnable ? '' : 'none';
			this.buttonMax.rootComponent.onclick = this._maxButtonClickHandler;
		}
		if (this.buttonClose) {
			this.buttonClose.style.display = this._closeEnable ? '' : 'none';
			this.buttonClose.rootComponent.onclick = this._closeButtonClickHandler;
		}
	}

	get buttonMin() {
		return this.findSkinPart('buttonMin');
	}

	get buttonMax() {
		return this.findSkinPart('buttonMax');
	}

	get buttonClose() {
		return this.findSkinPart('buttonClose');
	}

	/**
	 * @private
	 */
	_maxButtonClickHandler = (event) => {
		if (this._sizeState === TitleWindow.SIZE_MAX) {
			this.normal();
		}
		else {
			this.max();
		}

	}

	/**
	 * 最大化窗口
	 */
	max() {
		this._sizeState = TitleWindow.SIZE_MAX;
		this._drager.enable = false;
		this._updateSkinStatus();
	}

	/**
	 * 最小化窗口
	 */
	min() {
		this._sizeState = TitleWindow.SIZE_MIN;
		this._drager.enable = true;
		this._updateSkinStatus();
	}

	/**
	 * 窗口恢复成普通状态
	 */
	normal() {
		this._sizeState = TitleWindow.SIZE_NORMAL;
		this._drager.enable = true;
		this._updateSkinStatus();
	}

	/**
	 * @private
	 */
	_minButtonClickHandler = (event) => {
		if (this._sizeState === TitleWindow.SIZE_MIN) {
			this.normal();
		}
		else {
			this.min();
		}
	}

	/**
	 * @private
	 */
	_closeButtonClickHandler = (event) => {
		this.dispatchEvent(new DataEvent(DataEvent.CLOSE, null));
	}

	_unstallSkin() {
		this._drager.unbind();
		super._unstallSkin();
	}
}

export default TitleWindow;