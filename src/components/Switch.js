import ToggleButton from './ToggleButton';
import SwitchSkin from '../skins/SwitchSkin';

/**
 * 开关选择器 
 * 
 * @date   : 2017/9/8 下午5:03:19
 * 
 * @extends ToggleButton
 */
class Switch extends ToggleButton {

	_getDefaultSKinClass() {
		return SwitchSkin;
	}
}

export default Switch;