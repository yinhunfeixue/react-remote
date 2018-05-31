import { Component } from 'react';
import ObjectUtil from '../utils/ObjectUtil';
import EventDispatcher from '../core/EventDispatcher';

/**
 * UIComponent 类是所有可视组件（交互式和非交互式）的基类
 * 
 * <b>事件</b>
 * 组件在某些情况下，例如点击时，会抛出事件，可通过addEventListener监听事件。
 * 为了方便使用，有些常用事件还会提供一个快捷属性，例如onClick属性
 * 示例参考 {@link UIComponent#addEventListener addEventListener}
 * 
 * <b>forceUpdate</b>
 * 我们重写了forceUpdate函数，确保在componentWillMount之后执行，防止报错
 */
class UIComponent extends Component {

	constructor(props) {
		super(props);
		this._listener = new EventDispatcher();

		//先初始化所有属性
		this._initProperty();

		//如果在props中设置了属性，则使用props中的属性替换默认值
		ObjectUtil.Fill(this, props);
	}

	/**
   * 添加事件监听。如果相同类型的事件，已添加过相同的处理函数，则不再添加
	 * 为了方便使用，有些常用事件还会提供一个快捷属性，例如onClick属性
   * @param {string} type 事件类型
   * @param {function} fun 要添加的函数，函数有一个参数event 
   * @param {number} priority 优先级，值越大，越先执行。同一优先级的，按添加顺序执行，先添加先执行
	 * 
	 * @example
 	 * let button = new Button();
   * 
   * //下面的两句执行后，都会给click事件绑定btnClickHandler的方法
   * button.onClick = btnClickHandler;
   * //button.addEventListener('click', btnClickHandler);
   * 
   * //第二次执行时
   * //前者，会先移除btnClickHandler，再绑定到btnClickHandler2，当click事件发生时，只触发btnClickHandler
   * //后者会添加btnClickHandler2，当click事件发生时，会同时触发btnClickHandler和btnClickHandler2
   * button.onClick = btnClickHandler2;
   * //button.addEventListener('click', btnClickHandler2);
	 * 
	 * function btnClickHandler(event){
	 * 	//在此处对事件进行处理
	 * }
   */
	addEventListener(type, fun, priority) {
		this._listener.addEventListener(type, fun, priority);
	}

	/**
	* 移除事件监听
	* @param {string} type 事件类型
	* @param {function} fun 函数
	*/
	removeEventListener(type, fun) {
		this._listener.removeEventListener(type, fun);
	}

	/**
	* 判断是否注册了针对某个事件类型的监听
	* @param {string} type 事件类型
	*/
	hasEventListener(type) {
		return this._listener.hasEventListener(type);
	}

	/**
	* 将事件分派到事件流中
	* @param {RemoteEvent} event 要发出的事件
	*/
	dispatchEvent(event) {
		let e = event.clone();
		e.target = (event.target === null ? this : event.target);
		e.currentTarget = this;
		this._listener.dispatchEvent(e);
	}

	/**
	 * 切换监听函数，对于事件eventType，此方法先移除oldFunction，再添加newFunction
	 * @param {string} eventType 事件类型
	 * @param {function} newFunction 新的事件处理函数
	 * @param {function} oldFunction 旧的事件处理函数
	 * 
	 * @protected
	 */
	_changeEventListener(eventType, newFunction, oldFunction) {
		if (oldFunction != null) {
			this.removeEventListener(eventType, oldFunction);
		}
		if (newFunction != null) {
			this.addEventListener(eventType, newFunction);
		}
	}

	/**
	 * 设置组件属性的默认值
	 * @protected
	 */
	_initProperty() {
		this._enable = true;
		this.inited = false;
	}

	/**
	 * @private
	 */
	componentWillMount() {
		if (super.componentWillMount) {
			super.componentWillMount();
		}
		this.inited = true;
	}

	/**
	 * @private
	 * @param {object} nextProps 
	 */
	componentWillReceiveProps(nextProps) {
		if (super.componentWillReceiveProps) {
			super.componentWillReceiveProps(nextProps);
		}
		//把nextProps的值传到this
		ObjectUtil.Fill(this, ObjectUtil.filterDifferentValue(this, nextProps));
	}

	/**
	 * 组件是否可以接受用户交互
	 * @type {boolean}
	 * 
	 * @default true
	 */
	get enable() {
		return this._enable;
	}

	set enable(value) {
		if (this._enable !== value) {
			this._enable = value;
		}
	}

	/**
	 * 重写了forceUpdate，只有willMount后，才会被触发。
	 * react默认的forceUpdate未判断，但是在willMount前触发，会有警告
	 */
	forceUpdate() {
		if (this.inited) {
			super.forceUpdate();
		}
	}

	componentWillUnmount() {
		this.inited = false;
	}

	componentDidMount() {
	}

	componentDidUpdate(prevProps, prevState) {
	}
}

export default UIComponent;