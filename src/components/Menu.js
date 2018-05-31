import MenuItemRender from './MenuItemRender';
import TreeBase from './supports/TreeBase';
import MenuSkin from '../skins/MenuSkin';

/**
 * 菜单组件
 * Menu 控件创建可分别选择的选项的弹出菜单，此弹出菜单类似于大多数软件应用程序中的“文件”或“编辑”菜单。弹出菜单可以具有所需的任何数目的子菜单级别
 * 
 * @example <caption>创建菜单</caption>
 * let menuData = [new TreeNodeData('首页'), new TreeNodeData('发现'), new TreeNodeData('话题')];
 * menuData[0].selected = true;
 * <Menu data={this.state.menuData} changeHandler={(event) => {
 *   console.log(event.data);
 * }} />
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-30 13:56:08
 * 
 * @extends TreeBase
 */
class Menu extends TreeBase {

	_getDefaultSKinClass() {
		return MenuSkin;
	}

	get _itemClassType() {
		return MenuItemRender;
	}
}

export default Menu;