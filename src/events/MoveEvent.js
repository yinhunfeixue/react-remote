
import RemoteEvent from './RemoteEvent';
/**
 * 移动事件
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2018-1-4 18:33:40
 */
class MoveEvent extends RemoteEvent {

	static MOVEING = 'moveing';
	static MOVE_START = 'moveStart';
	static MOVE_END = 'moveEnd';

	constructor(type, x, y) {
		super(type);
		this.x = x;
		this.y = y;
	}

	clone = () => {
		return new MoveEvent(this.type, this.x, this.y);
	}
}
export default MoveEvent;