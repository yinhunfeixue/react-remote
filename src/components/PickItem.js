import SkinableComponent from '../components/SkinableComponent';
import PickerItemSkin from '../skins/PickerItemSkin';
/**
 * 表示Picker的一个子项
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-19 14:24:50
 * 
 * @extends SkinableComponent
 */
class PickItem extends SkinableComponent {
	/**
	 * @inheritDoc
	 */
	_initProperty() {
		super._initProperty();
		this._value = null;
		this._label = '';
		this.selectedAble = false;
	}

	_getDefaultSKinClass() {
		return PickerItemSkin;
	}

	get value() {
		return this._value;
	}

	set value(v) {
		this._value = v;
		this.forceUpdate();
	}

	get label() {
		return this._label;
	}

	set label(v) {
		this._label = v;
		this.forceUpdate();
	}
}

export default PickItem;