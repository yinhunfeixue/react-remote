
import List from './List';
import ButtonBarItem from './ButtonBarItem';
import ButtonBarSkin from '../skins/ButtonBarSkin';
/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-1 13:54:56
 */
class ButtonBar extends List {

	_getDefaultSKinClass() {
		return ButtonBarSkin;
	}

	_initProperty() {
		super._initProperty();
		this._itemClassType = ButtonBarItem;
	}
}
export default ButtonBar;