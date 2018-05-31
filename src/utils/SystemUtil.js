/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/5 上午10:35:19
 */

class SystemUtil {

	/**
	 * 判断是否是移动端
	 */
	static isMobile() {
		const ua = navigator.userAgent;
		const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
		const isAndroid = ua.match(/(Android)\s+([\d.]+)/);
		return isIphone || isAndroid;
	}

	/**
	  * 设置系统粘贴板的文字
	  * @param {string} str 要复制的文本内容
	  * @param {function} completeHandler 设置结束的处理函数，格式为fun(result)。 result表示复制结果，true表示复制成功，false表示复制失败
	  */
	static copyText(str, completeHandler) {
		let element = document.createElement('textarea');
		element.value = str;
		element.style.visibility = 'false';
		document.body.appendChild(element);
		element.select();

		let copyResult = true;
		try {
			document.execCommand('Copy');
		} catch (error) {
			copyResult = false;
		}
		finally {
			document.body.removeChild(element);
			completeHandler(copyResult);
		}
	}
}

export default SystemUtil;