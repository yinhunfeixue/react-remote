import ListItemRender from './ListItemRender';
import ButtonBarItemSkin from '../skins/ButtonBarItemSkin';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-1 14:31:52
 */
class ButtonBarItem extends ListItemRender {
	_getDefaultSKinClass() {
		return ButtonBarItemSkin;
	}
}
export default ButtonBarItem;