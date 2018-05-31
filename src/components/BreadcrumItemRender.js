import BreadcrumbItemRenderSkin from '../skins/BreadcrumbItemRenderSkin';
import ItemRender from '../components/supports/ItemRender';
/**
 * 面包屑子项
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-29 14:24:47
 * 
 */
class Breadcrumb extends ItemRender {
	_initProperty() {
		super._initProperty();
		this._index = 0;
		this._count = true;
		this._hrefFunction = null;
	}

	_getDefaultSKinClass() {
		return BreadcrumbItemRenderSkin;
	}

	_initSkin() {
		super._initSkin();
		if (this.rootComponent)
			this.rootComponent.addEventListener('click', this.clickHandler);
	}

	_unstallSkin() {
		if (this.rootComponent)
			this.rootComponent.removeEventListener('click', this.clickHandler);
		super._unstallSkin();
	}

	clickHandler = (event) => {
		this.selected = true;
	}

	/**
	 * 计算label属性的函数，格式为fun(data, index, count)
	 * data--数据项
	 * index--序号，从0开始
	 * count--一共有多少项
	 * @type {function}
	 * @default null
	 */
	get labelFunction() {
		return this._labelFunction;
	}
	set labelFunction(value) {
		if (this._labelFunction !== value) {
			this._labelFunction = value;
			this.forceUpdate();
		}
	}

	/**
	 * 计算href属性的函数，格式为fun(data, index, count)
	 * data--数据项
	 * index--序号，从0开始
	 * count--一共有多少项
	 * @type {function}
	 * @default null
	 */
	get hrefFunction() {
		return this._hrefFunction;
	}
	set hrefFunction(value) {
		if (this._hrefFunction !== value) {
			this._hrefFunction = value;
			this.forceUpdate();
		}
	}

	/**
	 * 获取显示的文字
	 * 优选使用labelFunction计算，其次使用data.label，再次使用data.toString()。
	 * 如果以上都不存在，则返回''
	 * 
	 * @readonly
	 * @type {string}
	 */
	get label() {
		if (!this.data)
			return '';

		if (this._labelFunction)
			return this._labelFunction(this.data, this.index, this.count);
		else if (this.data.label)
			return this.data.label;
		else
			return this.data.toString();
	}

	/**
	 * 获取显示的文字
	 * 优选使用hrefFunction计算，其次使用data.href，再次使用data.toString()。
	 * 如果以上都不存在，则返回''
	 * 
	 * @readonly
	 * @type {string}
	 */
	get href() {
		if (!this.data)
			return '';

		if (this._hrefFunction)
			return this._hrefFunction(this.data, this.index, this.count);
		else if (this.data.href)
			return this.data.href;
		else
			return this.data.toString();
	}

	get count() {
		return this._count;
	}
	set count(value) {
		if (this._count !== value) {
			this._count = value;
			this.forceUpdate();
		}
	}

	get index() {
		return this._index;
	}
	set index(value) {
		if (this._index !== value) {
			this._index = value;
			this.forceUpdate();
		}
	}
}

export default Breadcrumb;