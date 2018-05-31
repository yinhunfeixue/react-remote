import EventDispatcher from '../core/EventDispatcher.js';
import ProgressEvent from '../events/ProgressEvent';
import DataEvent from '../events/DataEvent';
import ErrorEvent from '../events/ErrorEvent';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-26 09:19:24
 */
class Loader extends EventDispatcher {

	static UNSTART = 1;
	static LOADING = 2;
	static COMPLETE = 3;
	static ERROR = 4;

	constructor() {
		super();
		this._loading = false;
		this._data = null;
		this._byteLoaded = 0;
		this._byteTotal = 0;
		this._status = Loader.UNSTART;
		this._xhr = new XMLHttpRequest();
		this._urlRequest = null;
	}

	get urlRequest() {
		return this._urlRequest;
	}

	get status() {
		return this._status;
	}

	get byteLoaded() {
		return this._byteLoaded;
	}

	get byteTotal() {
		return this._byteTotal;
	}

	/**
	 * 加载的数据，未加载成功时返回null
	 */
	get data() {
		return this._data;
	}

	/**
	 * 表示是否正在进行请求
	 */
	get loading() {
		return this._loading;
	}

	/**
	 * 发起请求，如果正在进行请求，此方法将强制中止当前请求
	 * 如果不希望意外中止正在进行请求，建议创建新的Loader，或者先判断loadin为false时，再使用此方法
	 * @param {UrlRequest} request 请求参数
	 */
	load(urlRequest) {
		this._urlRequest = urlRequest;
		if (urlRequest && urlRequest.url) {
			this.reset();
			let xhr = this._xhr;
			if (this._loading) {
				this.close();
			}
			xhr.onreadystatechange = this.readystatechangeHandler;
			xhr.onprogress = this.progressHandler;
			xhr.open(urlRequest.method, urlRequest.url);
			if (urlRequest.contentType) {
				xhr.responseType = urlRequest.contentType;
			}
			if (urlRequest.headers) {
				for (let key in urlRequest.headers) {
					xhr.setRequestHeader(key, urlRequest.headers[key]);
				}
			}
			xhr.send(urlRequest.data);
			this._status = Loader.LOADING;
		}
		else {
			throw new Error('urlRequest为null，或者url为null');
		}
	}

	close() {
		this._xhr.onreadystatechange = null;
		this._xhr.onprogress = null;
		this._xhr.abort();
	}

	reset() {
		this.close();
		this._status = Loader.UNSTART;
		this._byteLoaded = 0;
		this._byteTotal = 0;
		this._data = null;
	}

	readystatechangeHandler = (event) => {
		if (this._xhr.readyState === 4) {
			if (this._xhr.status === 200) {
				this._data = this._xhr.response;
				this._status = Loader.COMPLETE;
				this.dispatchEvent(new DataEvent(DataEvent.COMPLETE, this._data));
			}
			else {
				this.reset();
				this._status = Loader.ERROR;
				this.dispatchEvent(new ErrorEvent(ErrorEvent.ERROR));
			}
		}
	}

	progressHandler = (event) => {
		this._byteLoaded = event.loaded;
		this._byteTotal = event.total;
		if (this.hasEventListener(ProgressEvent.PROGRESS)) {
			this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, event.loaded, event.total));
		}
	}
}
export default Loader;