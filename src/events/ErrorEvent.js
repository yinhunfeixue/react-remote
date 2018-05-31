import RemoteEvent from "./RemoteEvent";



/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-28 11:47:25
 */
class ErrorEvent extends RemoteEvent {
	/**
	 * @enum {string}
	 */
	static ERROR = 'error';

	constructor(type, message) {
		super(type);
		this.message = message;
	}

	clone = () => {
		return new ErrorEvent(this.type, this.message);
	}
}
export default ErrorEvent;