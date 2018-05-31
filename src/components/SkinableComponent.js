/**

 */
import React from 'react';
import ObjectUtil from '../utils/ObjectUtil';
import UIComponent from './UIComponent';
/**
 * SkinnableComponent 类定义可设置外观的组件的基类。SkinnableComponent 类所使用的外观通常是 SkinBase 类的子类
 * 继承此类定义组件时，通常需要重写以下方法
 * 
 * //设置组件属性的默认值  {@link SkinableComponent#_initProperty _initProperty}
 * _initProperty()    		
 * 
 * //设置组件默认皮肤 {@link SkinableComponent#_getDefaultSKinClass _getDefaultSKinClass}
 * _getDefaultSKinClass
 * 
 * //设置皮肤可能出现的状态 {@link SkinableComponent#_getCurrentSkinStatus _getCurrentSkinStatus}
 * _getCurrentSkinStatus()
 * 
 * //初始化皮肤  {@link SkinableComponent#_initSkin _initSkin}
 * _initSkin()
 * 
 * @date    2017-09-05 11:24:58
 * 
 * @extends UIComponent
 */
class SkinableComponent extends UIComponent {

	/**
	 * 设置组件属性的默认值
	 * @protected
	 */
	_initProperty() {
		super._initProperty();
		this._currentStatus = null;
		this._skinClass = this._getDefaultSKinClass();
		this._skin = null;
		this._selectedAble = true;
	}

	/**
	 * 初始化皮肤部件的设置，在安装新皮肤、组件第一次渲染、组件更新后会调用
	 * 通常在这此函数处理皮肤部件的事件监听
	 * @protected
	 */
	_initSkin() {

	}

	/**
	 * 表示组件内容是否可选中
	 * @type {boolean}
	 * 
	 * @default true
	 */
	get selectedAble() {
		return this._selectedAble;
	}

	set selectedAble(value) {
		this._selectedAble = value;
	}

	/**
	 * 从皮肤中获取指定部件
	 * 在皮肤中通过设置ref属性设置名称
	 * @param {string} name 部件名称
	 * 
	 * @return {object} 部件实例
	 */
	findSkinPart(name) {
		if (this._skin != null) {
			return this.refs[name];
		}
	}

	componentWillMount() {
		this._installSkin();
		super.componentWillMount();
	}

	componentDidMount() {
		if (this.rootComponent) {
			this.rootComponent.onselectstart = () => { return this._selectedAble; };
			this.rootComponent.addEventListener('click', this.clickHandler.bind(this), true);
		}

		this._initSkin();
		super.componentDidMount();
	}

	componentDidUpdate(prevProps, prevState) {
		this._initSkin();
		super.componentDidUpdate(prevProps, prevState);
	}

	/**
	 * 单击事件处理函数
	 * @protected
	 */
	clickHandler(event) {
		if (!this.enable) {
			event.stopPropagation();
		}
	}

	/**
	 * @private
	 * @param {object} nextProps 
	 */
	componentWillReceiveProps(nextProps) {
		if (super.componentWillReceiveProps) {
			super.componentWillReceiveProps(nextProps);
		}

		//把props的值传递到rootComponent中，例如设置了样式和事件，实际上会被应用到rootComponent中
		ObjectUtil.Fill(this.rootComponent, ObjectUtil.filterDifferentValue(this.props, this._getEffectProp()), false, true);
	}
	/**
	 * 用于此组件的皮肤类的名称，皮肤类需要实现render方法，建议继承自{@link SkinBase}
	 * @type {Class}
	 */
	get skinClass() {
		return this._skinClass;
	}

	set skinClass(value) {
		if (this._skinClass !== value) {
			this._unstallSkin();
			this._skinClass = value;
			this._installSkin();
		}
	}

	/**
	 * @inheritdoc
	 */
	get enable() {
		return super.enable;
	}

	set enable(value) {
		if (this._enable !== value) {
			this._enable = value;
			this._updateSkinStatus();
		}
	}

	/**
	 * 获取当前皮肤状态，在子类中重写此方法，以设置不同的皮肤状态
	 * @protected
	 * 
	 * @property {string} unable 组件不可用状态
	 * 
	 * @return {string} 当前皮肤状态
	 */
	_getCurrentSkinStatus() {
		if (this.enable) {
			return '';
		} else {
			return 'unable';
		}
	}

	/**
	 * 默认皮肤类，当继承此类自定义组件时，一般需要重写此方法
	 * 
	 * @protected
	 * @type {Class}
	 * 
	 * @return {Class} 皮肤类
	 */
	_getDefaultSKinClass() {
		return null;
	}

	/**
	 * 组件的根显示对象
	 * @type {div}
	 * @readonly
	 */
	get rootComponent() {
		return this.refs.rootComponent;
	}

	/**
	 * 安装皮肤，组件初始化或者改变skinClass后，会执行此方法安装新皮肤
	 * @private
	 */
	_installSkin() {
		if (this._skinClass != null) {
			this._skin = new (this._skinClass)(this);
			this._currentStatus = null;
			this._updateSkinStatus();
			if (this.inited) {
				this._initSkin();
			}
		}
	}

	get style() {
		if (this.rootComponent) {
			return this.rootComponent.style;
		}
		return null;
	}

	_getDefaultStyle() {
		if (this._skin) {
			return this._skin.rootStyle;
		}
	}

	/**
	 * @private
	 */
	_unstallSkin() {
		if (this._skin != null) {
			if (this._skin.dispose) {
				this._skin.dispose();
			}
			this._skin = null;
			this._currentStatus = null;
		}
	}

	/**
	 * 更新皮肤状态
	 * 
	 * @private
	 */
	_updateSkinStatus() {
		if (this._skin != null) {
			const status = this._getCurrentSkinStatus();
			if (status !== this._currentStatus) {
				this._skin.styleChange(status, this._currentStatus);
				this._currentStatus = status;
				this.forceUpdate();
			}
		}
	}

	/**
	 * @private
	 */
	_getEffectProp() {
		let obj = ObjectUtil.clone(this.props);
		delete obj.style;
		return obj;
	}

	_getSkinClass() {
		let result = [];
		if (this._skin && this._skin.rootClass) {
			result.push(this._skin.rootClass);
		}
		if (this.props.className) {
			result.push(this.props.className);
		}

		return result.join(' ');
	}

	render() {
		let result = (
			<div ref='rootComponent' remote-root='true'
				{...ObjectUtil.Fill(document.createElement('div'),
					this._getEffectProp(), false, true)}
				style={ObjectUtil.Merge({ display: 'inline-block' }, this.props.style, this._getDefaultStyle())} className={this._getSkinClass()}>
				{this._skin ? this._skin.render() : <span></span>}
			</div>);

		return result;
	}
}

export default SkinableComponent;