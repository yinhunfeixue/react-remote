import ListBase from './supports/ListBase';
import PickItem from './PickItem';
import SystemUtil from '../utils/SystemUtil';
import HtmlUtil from '../utils/HtmlUtil';
import NumberUtil from '../utils/NumberUtil';
import Point from '../core/Point';
import PickerSkin from '../skins/PickerSkin';
/**
 * Picker控件包含多个选项，可通过滑动的方式选择其中一项
 * 
 * @date   : 2017-9-19 13:40:44
 * 
 * @extends ListBase
 */
class Picker extends ListBase {

	_createItemProps(data, index) {
		let result = super._createItemProps(data, index);
		result.style = { height: this._itemHeight + 'px' };
		return result;
	}
	_initProperty() {
		super._initProperty();
		this._itemHeight = 30;
		this._displayItemNumber = 5;
		this._selectedIndex = 0;
		this._startMousePoint = null;
		this._startPosition = null;
		this.itemClassType = PickItem;
	}

	/**
	 * 显示的子项数量
	 */
	get displayItemNumber() {
		return this._displayItemNumber;
	}

	set displayItemNumber(value) {
		if (this._displayItemNumber !== value) {
			this._displayItemNumber = value;
			this.forceUpdate();
		}
	}

	/**
	 * 子项高度,单位：像素
	 * @type {number}
	 * @default 30
	 */
	get itemHeight() {
		return this._itemHeight;
	}

	set itemHeight(value) {
		if (this._itemHeight !== value) {
			this._itemHeight = value;
			this.forceUpdate();
		}
	}

	/**
	 * skinPart 子项容器
	 */
	get container() {
		return this.findSkinPart('container');
	}

	/**
	 * @inheritdoc
	 */
	_initSkin() {
		super._initSkin();

		if (this.container) {
			this.container.style.width = '100%';
			this.container.style.position = 'absolute';
			this.container.style.height = '';

			const mouseEvents = ['mousedown'];
			const touchEvents = ['touchstart'];

			let useEvents = SystemUtil.isMobile() ? touchEvents : mouseEvents;
			useEvents.forEach((value) => this.rootComponent.addEventListener(value, this._mouseDownHandler.bind(this)), this);
			this._setContainerPosition(this._valueToPosition(this._selectedIndex));
		}
	}

	/**
	 * @inheritdoc
	 */
	set selectedIndex(value) {
		if (this._children === null || this._children.length === 0)
			return;

		if (this.selectedIndex !== value) {
			this._selectedIndex = value;
			this._setContainerPosition(this._valueToPosition(value));
		}
	}

	/**
	 * @private
	 */
	_setContainerPosition(y) {
		if (this.container) {
			this.container.style.top = y + 'px';
		}
	}

	/**
	 * @private
	 */
	_mouseDownHandler = (event) => {
		if (this.enable) {
			this._startMousePoint = HtmlUtil.getMouseEventPosition(event);
			this._startPosition = new Point(this.container.offsetLeft, this.container.offsetTop);
			const mouseEvents = ['mouseup', 'mousemove'];
			const touchEvents = ['touchend', 'touchmove'];

			let useEvents = SystemUtil.isMobile() ? touchEvents : mouseEvents;
			useEvents.forEach((value) => { document.addEventListener(value, this._mouseEventHandler) }, this);
		}
	}

	/**
	 * @private
	 */
	_mouseEventHandler = (event) => {
		switch (event.type) {
			case 'mouseup':
			case 'touchend':
				{
					const mouseEvents = ['mouseup', 'mousemove'];
					const touchEvents = ['touchend', 'touchmove'];

					let useEvents = SystemUtil.isMobile() ? touchEvents : mouseEvents;
					useEvents.forEach((value) => { document.removeEventListener(value, this._mouseEventHandler) }, this);

					//根据位置，设置距离最近的选中项
					let point = HtmlUtil.getMouseEventPosition(event);
					if (point != null) {
						let y = (this._startPosition.y + point.y - this._startMousePoint.y);
						this.selectedIndex = this._positionToValueIndex(y);
					}
					break;
				}
			case 'mousemove':
			case 'touchmove':
				{
					let point = HtmlUtil.getMouseEventPosition(event);
					if (point != null) {
						let y = (this._startPosition.y + point.y - this._startMousePoint.y);

						//内容随鼠标滚动,但是不超出第0项和最后一项的范围
						let y0 = this._valueToPosition(0)
						let yMax = this._valueToPosition(this._children.length - 1);
						this._setContainerPosition(NumberUtil.limit(y, yMax, y0));
					}
					break;
				}
			default: {
			}
		}
	}

	/**
	 * 获取当选中第index项时，container的top值
	 * @param {Number} index 选中项序号 
	 * 
	 * @private
	 */
	_valueToPosition(index) {
		let y = this._itemHeight * this._displayItemNumber / 2 - (index * this._itemHeight + 0.5 * this._itemHeight);
		return y;
	}

	/**
	 * 当container的top值为y时，对应的选中项
	 * @param {Number} y top值 
	 */
	_positionToValueIndex(y) {
		let result = Math.round((this._itemHeight * this._displayItemNumber / 2 - y - 0.5 * this._itemHeight) / this._itemHeight);
		return NumberUtil.limit(result, 0, this._children.length - 1);
	}

	/**
	 * @inheritdoc
	 */
	_getDefaultStyle() {
		let height = this._displayItemNumber * this._itemHeight + 'px';
		return {
			position: 'relative',
			overflow: 'hidden',
			height: height,
			minWidth: '100px'
		};
	}

	/**
	 * @inheritdoc
	 */
	_getDefaultSKinClass() {
		return PickerSkin;
	}
}

export default Picker;