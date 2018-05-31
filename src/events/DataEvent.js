import RemoteEvent from './RemoteEvent';
/**
 * 携带数据的事件
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-27 11:32:28
 */

class DataEvent extends RemoteEvent {

  /**
   * @enum {string} 关闭事件
   */
	static CLOSE = 'close';

	/**
	 * @enum {string} 数据变化事件
	 */
	static DATA_CHANGED = 'dataChanged';

	/**
	 * 一项完成事件
	 */
	static ITEM_COMPLETE = 'itemComplete';

	constructor(type, data) {
		super(type);
		this.data = data;
	}

	clone = () => {
		return new DataEvent(this.type, this.data);
	}
}

export default DataEvent;