import ToggleButtonBase from './supports/ToggleButtonBase';

/**
 * ToggleButton 组件定义切换按钮。单击该按钮会在弹起状态和按下状态之间进行切换。如果在按钮处于弹起状态时单击该按钮，则它会切换到按下状态。必须再次单击该按钮才可将其切换回弹起状态。
 * 可以使用 selected 属性以编程方式获取或设置此状态。
 * @extends ToggleButtonBase
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/5 下午1:05:31
 */
class ToggleButton extends ToggleButtonBase {
	/**
	 * @inheritdoc
	 */
	clickHandler(event) {
		super.clickHandler(event);
		if (this.enable) {
			this.selected = !this.selected;
		}
	}
}
export default ToggleButton;
