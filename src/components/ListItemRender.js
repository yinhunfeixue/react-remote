import ItemRender from './supports/ItemRender';
import ListItemSkin from '../skins/ListItemSkin';
/**
 * 表示List组件的一个子项
 * 
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-16 09:51:13
 */
class ListItemRender extends ItemRender {

	_getDefaultSKinClass() {
		return ListItemSkin;
	}

	get selectedAble() {
		return this._selectedAble;
	}

	set selectedAble(value) {
		if (this._selectedAble !== value) {
			this._selectedAble = value;
			if (this._selectedAble === false) {
				this.selected = false;
			}
		}
	}

	get label() {
		if (this.data && this._labelFunction) {
			return this._labelFunction(this.data, this.index);
		}
		else {
			return super.label;
		}
	}

	_initProperty() {
		super._initProperty();
		this._index = -1;
		this._selectedAble = true;
	}

	_initSkin() {
		super._initSkin();
		if (this.rootComponent)
			this.rootComponent.addEventListener('click', this.clickHandler);
	}

	_unstallSkin() {
		if (this.rootComponent)
			this.rootComponent.removeEventListener('click', this.clickHandler);

		super._unstallSkin();
	}

	clickHandler(event) {
		this.selected = true;
	}

	/**
	 * 属于列表中的第几项
	 * @type {number}
	 * @default -1;
	 */
	get index() {
		return this._index;
	}
	set index(value) {
		if (this._index !== value) {
			this._index = value;
			this.forceUpdate();
		}
	}

	/**
	* 表示是否选中
	* @type {boolean}
	* @default false
	*/
	get selected() {
		return this._selected;
	}
	set selected(value) {
		if (this.selectedAble) {
			super.selected = value;
		}
	}
}
export default ListItemRender;