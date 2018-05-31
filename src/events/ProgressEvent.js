import RemoteEvent from './RemoteEvent';

/**
 * 进度事件
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-26 19:03:13
 */
class ProgressEvent extends RemoteEvent {

	/**
	 * @enum {string} 进度事件
	 */
	static PROGRESS = 'progress';

	constructor(type, bytesLoaded, bytesTotal) {
		super(type);

		/**
		 * 当前进度
		 */
		this.bytesLoaded = bytesLoaded;
		this.bytesTotal = bytesTotal;
	}

	clone() {
		return new ProgressEvent(this.type, this.bytesLoaded, this.bytesTotal);
	}
}
export default ProgressEvent;