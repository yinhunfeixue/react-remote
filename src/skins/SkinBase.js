
import React from 'react';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/8/31 下午7:26:28
 */
class SkinBase extends React.Component {

	/**
	 * 
	 * @param {*} target 皮肤对应的组件
	 * @param {*} rootClass 组件根html元素的css类名
	 * @param {*} rootStyle 组件根html元素的样式
	 */
	constructor(target, rootClass = null, rootStyle = null) {
		super(null);
		this.target = target;
		this._status = null;
		this._oldStatus = null;
		this._rootClass = rootClass;
		this._rootStyle = rootStyle;
	}

	/**
	 * 组件根Html元素的css类名
	 */
	get rootClass() {
		return this.getClassByStatus(this._rootClass);
	}

	/**
	 * 组件根html元素的样式
	 * @readonly
	 */
	get rootStyle() {
		return this._rootStyle;
	}

	styleChange(newStatus, oldStatus) {
		this._status = newStatus;
		this._oldStatus = oldStatus;
	}

	render() {
		return <div></div>;
	}

	get status() {
		return this._status;
	}

	dispose() {
		this.target = null;
	}

	getClassByStatus(baseName) {
		if (baseName)
			return baseName + (this.status ? ' ' + baseName + '-' + this.status : '');

		return '';
	}
}
export default SkinBase;