import Mask from '../components/Mask';
import React from 'react';
import ReactDOM from 'react-dom';
import ObjectUtil from '../utils/ObjectUtil';
/**
 * 弹出层管理器
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-21 14:53:54
 */

class PopupManager {
	static _containerDic = new Map();

	static _css = {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 1000,
		position: 'fixed'
	};

	static _centerCss = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};


	/**
	 * 弹出指定对象
	 * @param {Object} target 要弹出的对象
	 * @param {boolean} isCenter 是否居中显示弹出对象，如果不居中，需要自行设置位置
	 * @param {boolean} isModal 是否用模态弹出，模态弹出会在弹出对象下方添加一个遮挡层
	* @param {string} key 弹出对象的标识，如果不设置，则等于target。此参数不可重复，如果重复，无法弹出
	 */
	static addPopUp(target, isCenter = true, isModal = true, key = null) {
		if (key === null)
			key = target;

		if (PopupManager._containerDic.has(key)) {
			throw new Error(key + '弹出对象已存在');
		}

		//创建不可见的容器
		let container = document.createElement('div');
		document.body.appendChild(container);

		PopupManager._containerDic.set(key, container);

		let children = target;

		//如果是模态窗口，创建模态层
		if (isModal) {
			children = <div style={PopupManager._css}>
				<Mask />
				<div style={isCenter ? ObjectUtil.Merge(PopupManager._css, PopupManager._centerCss) : PopupManager._css}>
					{target}
				</div>
			</div>
		}
		ReactDOM.render(children, container);
	}

	/**
	 * 移除弹出对象
	 * @param {*} key 弹出对象标识
	 */
	static removePopUp(key) {
		if (PopupManager._containerDic.has(key)) {
			let container = PopupManager._containerDic.get(key);
			document.body.removeChild(container);
			ReactDOM.unmountComponentAtNode(container);
			PopupManager._containerDic.delete(key);
		}
	}
}

export default PopupManager;