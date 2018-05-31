import Point from '../core/Point';
import Rectangle from '../core/Rectangle';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/11 上午9:22:52
 */
class HtmlUtil {

	/**
	 * 获取元素相对页面左上角的坐标
	 * @param {htmlElement} element HTML元素
	 * 
	 * @return {Point} 元素相对页面左上解的坐标，如果元素为Null,返回Null
	 */
	static getPositionToPage(element) {
		if (element === null) {
			return null;
		}
		let marginLeft = parseFloat(element.style.marginLeft) || parseFloat(element.style.margin);
		let marginTop = parseFloat(element.marginTop) || parseFloat(element.style.margin);
		if (isNaN(marginLeft))
			marginLeft = 0;
		if (isNaN(marginTop))
			marginTop = 0;
		let result = new Point(element.offsetLeft - marginLeft, element.offsetTop - marginTop);
		if (element.offsetParent !== null) {
			result.addPoint(HtmlUtil.getPositionToPage(element.offsetParent));
		}
		return result;
	}

	/**
	 * 获取元素相对页面左上角的显示区域
	 * @param {*} element 
	 * @return {Rectangle} 矩形区域
	 */
	static getRectangleToPage(element) {
		let point = HtmlUtil.getPositionToPage(element);
		return new Rectangle(point.x, point.y, element.clientWidth, element.clientHeight);
	}

	/**
	 * 获取元素style.left, style.top的数字值
	 * @param {*} element 
	 * @return {Point} 坐标点
	 */
	static getLeftTop(element) {
		if (element === null) {
			return null;
		}
		let style = window.getComputedStyle(element);
		let x = parseFloat(style.left);
		let y = parseFloat(style.top);
		if (isNaN(x)) {
			x = 0;
		}
		if (isNaN(y)) {
			y = 0;
		}
		return new Point(x, y);
	}

	/**
	 * 相对页面左上角的全局坐标转换为相对某元素的坐标
	 * @param {Point} globalPosition 全局坐标
	 * @param {HtmlElement} element 元素
	 * 
	 * @return {Point} globalPosition相对elements的坐标值，如果elements或globalPosition为null，返回globalPosition本身
	 */
	static globalToLocal(globalPosition, element) {
		if (globalPosition === null || element === null) {
			return globalPosition;
		}

		let result = globalPosition.clone();
		let elementsOffset = HtmlUtil.getPositionToPage(element);
		return result.subPoint(elementsOffset);
	}

	/**
	 * 获取页面滚动的坐标
	 * @return {Point} 坐标点
	 */
	static getWindowScrollPositon() {
		return new Point(document.body.scrollLeft || document.documentElement.scrollLeft, document.body.scrollTop || document.documentElement.scrollTop);
	}

	static setWindowScrollPosition(x, y) {
		if (document.body.scrollLeft) {
			document.body.scrollLeft = x;
		}
		else {
			document.documentElement.scrollLeft = x;
		}

		if (document.body.scrollTop) {
			document.body.scrollTop = y;
		}
		else {
			document.documentElement.scrollTop = y;
		}
	}

	/**
	 * 获取页面尺寸
	 * @return {Rectangle} 页面尺寸
	 */
	static getWindowRectangle() {
		return new Rectangle(0, 0, document.body.clientWidth || document.documentElement.clientWidth, document.body.clientHeight || document.documentElement.clientHeight);
	}

	/**
	 * 获取指定元素相对于浏览器窗口左上角的位置
	 * @param {*} element 
	 * 
	 * @return {Point} 坐标点
	 */
	static getPositionToWindow(element) {
		return HtmlUtil.getPositionToPage(element).subPoint(HtmlUtil.getWindowScrollPositon());
	}

	/**
	 * 获取元素相对浏览器窗口左上角的显示区域
	 * @param {*} element 
	 * 
	 * @return {Rectangle} 矩形区域
	 */
	static getRectangleToWindow(element) {
		let result = HtmlUtil.getRectangleToPage(element);
		let scroll = HtmlUtil.getWindowScrollPositon();
		result.x -= scroll.x;
		result.y -= scroll.y;
		return result;
	}

	/**
	 * 获取鼠标事件的全局坐标，支持移动端事件
	 * @param {Event} event 鼠标事件
	 * @return {Point} 坐标点
	 */
	static getMouseEventPosition(event) {
		if (event.pageX) {
			return new Point(event.pageX, event.pageY);
		}
		else if (event.changedTouches && event.changedTouches[0]) {
			return new Point(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
		}
		return null;
	}

	/**
	 * 创建元素
	 * @param {string} tag 元素类型
	 * @param {string} className 样式名
	 * @param {string} innerHTML 内容
	 * 
	 * @return {HTMLElement}
	 */
	static createElement(tag, className = null, innerHTML = null) {
		let result = document.createElement(tag);
		result.className = className ? className : "";
		result.innerHTML = innerHTML;
		return result;
	}
}
export default HtmlUtil;