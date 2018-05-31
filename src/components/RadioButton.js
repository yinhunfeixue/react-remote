import ToggleButtonBase from './supports/ToggleButtonBase';
import RadioButtonSkin from '../skins/RadioButtonSkin';

/**
 * RadioButton 组件使用户可在一组互相排斥的选择中做出一种选择。
 * RadioButtonGroup 包含两个或更多 RadioButton 组件，当选中一个时，其它的RadioButton会自动取消选中
 * 
 * 通常需要配合{@link RadioButtonGroup}使用
 * 
 * @extends ToggleButtonBase
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/5 下午1:06:06
 */
class RadioButton extends ToggleButtonBase {

  /**
	 * @inheritdoc
	 */
  _initProperty() {
    super._initProperty();
    this._value = null;
    this._selectedAble = true;
    this._group = null;
  }

  get group() {
    return this._group;
  }
  set group(value) {
    if (this._group !== value) {
      if (this._group)
        this._group.removeItem(this);
      this._group = value;
      if (this._group) {
        this._group.addItem(this);
      }
    }
  }

  /**
   * 携带的数据
   * @type {*}
   */
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.forceUpdate();
  }

  /**
	 * @inheritdoc
	 */
  clickHandler(event) {
    super.clickHandler(event);
    if (this.enable && this.selected !== true)
      this.selected = true;
  }

  /**
  * @inheritdoc
  */
  _getDefaultSKinClass() {
    return RadioButtonSkin;
  }
}

export default RadioButton;
