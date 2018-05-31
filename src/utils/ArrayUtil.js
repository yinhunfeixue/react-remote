/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-30 10:26:32
 */

class ArrayUtil {

	/**
	 * 判断一个数组是否是空数组
	 * 当数组不存在或者元素为0时，返回true
	 * 
	 * @static
	 * @param {any} array 
	 * @returns {boolean}
	 * @memberof ArrayUtil
	 */
	static isEmpty(array) {
		return !array || array.length === 0;
	}

}

export default ArrayUtil;