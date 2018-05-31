import ToggleButton from './ToggleButton';
import Skin from '../skins/CheckBoxSKin';

/**
 * CheckBox 控件默认外观包含一个可选标签和一个小方框，该方框内可以包含/不包含选中标记。
 * 当用户单击 CheckBox 控件或其相关文本时，CheckBox 控件的状态将从选中更改为未选中，或者从未选中更改为选中。
 * 多个CheckBox控件可包含一组<b>非相互排斥</b>的true或false值，可通过selected获取和设置此值
 * 
 * @extends ToggleButton
 * @author : xujunjie
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/5 下午1:05:48
 */
class CheckBox extends ToggleButton {
  
  /**
	 * @inheritdoc
	 */
  _initProperty(){
    super._initProperty();
    this._value = null;
    this._group = null;
  }

  /**
   * 所属多选框组
   * @type {}
   * @default 
   */
  get group(){
    return this._group;
  }
  set group(value) {
    if(this._group !== value){
      if(this._group){
        this._group.removeItem(this);
      }
      this._group = value;
      if(this._group){
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
  }

  _getDefaultSKinClass() {
    return Skin;
  }
}

export default CheckBox;
