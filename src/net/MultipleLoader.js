import EventDispatcher from "../core/EventDispatcher";
import ProgressEvent from "../events/ProgressEvent";
import Loader from "./Loader";
import DataEvent from "../events/DataEvent";
import ErrorEvent from "../events/ErrorEvent";
import RemoteEvent from "../events/RemoteEvent";



/**
 * 多文件加载器
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-28 13:22:45
 */
class MultipleLoader extends EventDispatcher {

	/**
	 * 
	 * @param {*} maxLoadingNumber 同时进行的最大下载数
	 */
	constructor(maxLoadingNumber = 3) {
		super();
		this._requestList = [];														//请求列表，每一项是一个UrlRequest
		this._loaderMap = new Map();											//加载器键值对,格式为[urlRequest] = Loader
		this._remainCountMap = new Map();									//剩余下载次数键值对,格式为[urlRequest] = 3
		this._percent = 0;																//当前加载的进度
		this._maxLoadingNumber = maxLoadingNumber;				//最大同时下载的数量
		this._status = Loader.UNSTART;
		this._usedTime = 0;																//已用时间，如果一个加载器被多轮使用（加载完成后，再次添加项目加载），此值表示已经加载完成的那些轮总耗时，不包含本轮未完成的时间

		this._startTime = null;														//本轮开始下载的时间

		this._lastLoadeBytes = 0;
		this._lastProgressTime = 0;
	}

	/**
	 * 当前状态
	 * @property {string} Loading.COMPLETE 已结束
	 * @property {string} Loading.LOADING 加载中
	 * @property {string} Loading.UNSTART	未加载
	 */
	get status() {
		return this._status;
	}

	/**
	 * 当前下载进度
	 */
	get percent() {
		return this._percent;
	}

	get sucessedNumber() {
		let loaderList = this._loaderMap.values();
		let result = 0;
		for (let loader of loaderList) {
			if (loader.status === Loader.COMPLETE) {
				result++;
			}
		}
		return result;
	}

	get errorNumber() {
		let loaderList = this._loaderMap.values();
		let result = 0;
		for (let loader of loaderList) {
			if (loader.status === Loader.ERROR) {
				result++;
			}
		}
		return result;
	}

	hasRequest(urlRequest) {
		return this._requestList.indexOf(urlRequest) >= 0;
	}

	/**
	 * 添加下载请求，如果请求（urlRequest实例）已存在，不执行操作
	 * @param {*} urlRequest 
	 * @param {*} maxLoadCount 加载失败的情况下，最多尝试下载的次数（包含第一次）。默认为3，表示如果第1次失败，会再尝试2次
	 */
	addItem(urlRequest, maxLoadCount = 3) {
		//如果请求已存在，不执行操作
		if (this.hasRequest(urlRequest)) {
			return;
		}
		//把请求和剩余次数添加到列表中
		this._requestList.push(urlRequest);
		this._remainCountMap.set(urlRequest, maxLoadCount);
		this._updateProgress();
		this._autoLoad();
	}

	/**
	 * 移除正在加载的项，如果加载正在进行，会尝试中止
	 * @param {*} urlRequest 
	 */
	removeItem(urlRequest) {
		let index = this._requestList.indexOf(urlRequest);
		if (index >= 0) {
			this._requestList.splice(index, 1);
			this._remainCountMap.delete(urlRequest);
			let loader = this._loaderMap.get(urlRequest);
			if (loader) {
				loader.close();
			}
			this._loaderMap.delete(urlRequest);
			this._updateProgress();
			this._autoLoad();
		}
	}

	get loadedBytes() {
		let loaderList = this._loaderMap.values();
		let result = 0;
		for (let item of loaderList) {
			if (item.status === Loader.COMPLETE || item.status === Loader.LOADING) {
				result += item.byteLoaded;
			}
		}
		return result;
	}

	/**
	 * 平均速度  字节/秒
	 */
	get avgSpeed() {
		let loadedBytes = this.loadedBytes;
		let usedTime = this._usedTime;

		if (this._status === Loader.LOADING) {
			usedTime += Date.now() - this._startTime;
		}
		return loadedBytes * 1000 / usedTime;
	}

	/**
	 * 即时速度  字节/秒
	 */
	get speed() {
		if (this._status === Loader.LOADING) {
			return (this.loadedBytes - this._lastLoadeBytes) * 1000 / (Date.now() - this._lastProgressTime);
		}
		return 0;
	}

	/**
	 * 自动执行加载
	 * 寻找下一个可下载的进行下载，如果没有，则不执行操作
	 */
	_autoLoad() {
		//查找处于加载状态的loader，如果小于允许的最大数量，则查找可用(剩余下载次数大于0)的下载请求
		let loadingCount = 0;
		let loaderList = this._loaderMap.values();
		for (let value of loaderList) {
			if (value.status === Loader.LOADING) {
				loadingCount++;
			}
		}
		if (loadingCount >= this._maxLoadingNumber) {
			return;
		}

		//寻找等待下载的请求进行下载,并把剩余次数减1
		let request = this._getWaitRequest();

		if (request) {
			let remainCount = this._remainCountMap.get(request);
			this._remainCountMap.set(request, --remainCount);

			//如果此请求还未创建loader，则创建loader。之后进行下载
			/**
			 * @type {Loader}
			 */
			let loader;
			if (this._loaderMap.has(request)) {
				loader = this._loaderMap.get(request);
			}
			else {
				loader = new Loader();
				loader.addEventListener(ProgressEvent.PROGRESS, this.loader_progressHandler);
				loader.addEventListener(DataEvent.COMPLETE, this.loader_completeHandler);
				loader.addEventListener(ErrorEvent.ERROR, this.loader_completeHandler);
				this._loaderMap.set(request, loader);
			}
			//如果是空闲状态，变更为加载状态
			if (this._status === Loader.UNSTART || this._status === Loader.COMPLETE) {
				this._status = Loader.LOADING;
				this._startTime = Date.now();
			}
			loader.load(request);

			//继续尝试加载，直到正在加载的请求等于最大允许数或者没有等待加载的请求
			this._autoLoad();
		}
		//如果没有等待加载的请求，判断是否所有请求都加载结束，如果结束，发出加载完成事件
		else {
			let isComplete = true;
			for (let request of this._requestList) {
				let loader = this._loaderMap.get(request);
				let remainNumber = this._remainCountMap.get(request);


				//如果还有剩余下载次数，但是又不是处于下载结束状态，则整体加载没结束
				if (remainNumber > 0 && loader.status !== Loader.COMPLETE && loader.status !== Loader.ERROR) {
					isComplete = false;
					break;
				}
			}

			if (isComplete) {
				this._status = Loader.COMPLETE;
				this._usedTime += Date.now() - this._startTime;
				this._startTime = null;
				if (this.hasEventListener(RemoteEvent.COMPLETE)) {
					this.dispatchEvent(new RemoteEvent(RemoteEvent.COMPLETE));
				}
			}
		}
	}

	loader_progressHandler = (event) => {
		this._updateProgress();
	}

	loader_completeHandler = (event) => {
		this._updateProgress();
		this._autoLoad();
		let loader = event.currentTarget;
		if (loader.status === Loader.COMPLETE || (loader.status === Loader.ERROR && this._remainCountMap.get(loader.urlRequest) <= 0)) {
			//如果加载成功，或者加载错误，但是剩余次数为0;发出单个加载器完成的事件
			if (this.hasEventListener(DataEvent.ITEM_COMPLETE)) {
				this.dispatchEvent(new DataEvent(DataEvent.ITEM_COMPLETE, event.currentTarget));
			}
		}
	}

	/**
	 * 获取等待加载的请求
	 * 剩余次数大于0，且对应的Loader不在加载状态
	 */
	_getWaitRequest() {
		for (let i = 0; i < this._requestList.length; i++) {
			let request = this._requestList[i];
			let loader = this._loaderMap.get(request);
			let remainCount = this._remainCountMap.get(request);
			if (remainCount > 0 && (!loader || loader.status === Loader.UNSTART || loader.status === Loader.ERROR)) {
				return request;
			}
		}
		return null;
	}

	_updateProgress() {
		//请求的数量为n，则总进度为n，有一个请求加载完成，进度增加1/n，对于正是进行的加载，进行为1/n * 此请求本身的进度
		let loadedPercent = 0;
		let maxNumber = this._requestList.length;
		for (let i = 0; i < maxNumber; i++) {
			let request = this._requestList[i];
			let loader = this._loaderMap.get(request);
			if (loader) {
				if (loader.status === Loader.COMPLETE || loader.status === Loader.ERROR) {
					loadedPercent += 1 / maxNumber;
				}
				else if (loader.status === Loader.LOADING && loader.byteTotal > 0) {
					loadedPercent += loader.byteLoaded / loader.byteTotal * 1 / maxNumber;
				}
			}
		}

		//如果当前进度和上次的进度不同，发出进度改变事件
		if (loadedPercent !== this._percent) {
			this._percent = loadedPercent;
			if (this.hasEventListener(ProgressEvent.PROGRESS)) {
				this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, this._percent, 1));
			}
		}

		//数据一秒更新一次，为了更准砍反映即时速度，否则跳跃太大
		if (Date.now() - this._lastProgressTime > 1000) {
			this._lastLoadeBytes = this.loadedBytes;
			this._lastProgressTime = Date.now();
		}
	}
}
export default MultipleLoader;