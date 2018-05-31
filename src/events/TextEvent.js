import Event from './RemoteEvent';

/**
 * 文本变化事件
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-18 16:03:04
 */
class TextEvent extends Event {

	/**
	 * @enum {string}
	 */
	static TEXT_CHANGE = 'textChange';

	constructor(type, text, oldText) {
		super(type);
		this.text = text;
		this.oldText = oldText;
	}

	clone = () => {
		return new TextEvent(this.type, this.text, this.oldText);
	}
}

export default TextEvent;