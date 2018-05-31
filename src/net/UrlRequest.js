

/**
 * 
 * 请求信息
 * 
 * @author : xujunjie 
 * @date   : 2017-12-26 12:21:43
 */
class UrlRequest {
	constructor(url = null) {

		/**
		 * 请求方法，默认为get
		 * 
		 * @default 'GET'
		 */
		this.method = 'GET';

		/**
		 * 期望服务器返回的数据类型
		 */
		this.contentType = null;

		/**
		 * 请求携带的数据
		 */
		this.data = null;

		/**
		 * 请求url
		 */
		this.url = url;

		/**
		 * 请求头
		 * @type {Object}
		 */
		this.headers = null;
	}
}
export default UrlRequest;