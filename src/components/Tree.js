import TreeBase from './supports/TreeBase';
import TreeItemRender from './TreeItemRender';
import TreeSkin from '../skins/TreeSkin';
/**
 * 树控件
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-29 13:02:34
 * 
 * @extends TreeBase
 */
class Tree extends TreeBase {

	_getDefaultSKinClass() {
		return TreeSkin;
	}
	get _itemClassType() {
		return TreeItemRender;
	}
}
export default Tree;