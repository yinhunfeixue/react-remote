import SkinableComponent from './SkinableComponent';
import ProgressBarSkin from '../skins/ProgressBarSkin';

/**
 * 进度条
 * @author: xujunjie 
 * @Date: 2017-09-28 11:24:29 
 * @Last Modified time: 2017-09-28 11:24:29 
 * 
 * @example 
 * componentDidMount() {
 *  setInterval(() => {
 *    if (this.refs.pb.value >= this.refs.pb.maxValue) {
 *       this.refs.pb.value = 0;
 *     } else {
 *       this.refs.pb.value += 10;
 *     }
 *   }, 500);
 * }
 *
 * pbLabelFun(value, maxValue){
 *   return value + '/' + maxValue;
 * }
 * 
 * <ProgressBar ref='pb' value={50.6} maxValue={100} labelFunction={this.pbLabelFun} />
 * 
 * @extends SkinableComponent
 */
class ProgressBar extends SkinableComponent {

  get label() {
    if (this._labelFunction) {
      return this._labelFunction(this.value, this.maxValue);
    }
    return Math.round(this.value * 100 / this.maxValue) + '%';
  }

  /**
   * @inheritdoc
   */
  _initProperty() {
    super._initProperty();
    this._value = 0;
    this._maxValue = 100;
    this._labelFunction = null;
  }

  /**
   * 进度值转换为文本的函数，格式为fun(value, maxValue)
   * 如果为null，则使用系统默认转换函数
   * @property {number} value 当前进度值
   * @property {number} maxValue 最大进度值
   * 
   * @type {function}
   * 
   * @default null
   */
  get labelFunction() {
    return this._labelFunction;
  }
  set labelFunction(value) {
    if (this._labelFunction !== value) {
      this._labelFunction = value
      this.forceUpdate();
    }
  }

  /**
   * @inheritdoc
   */
  _getDefaultSKinClass() {
    return ProgressBarSkin;
  }

  /**
   * 设置进度信息和最大进度值
   * 
   * @param {number} value 进度值
   * @param {number} maxValue 最大进度值
   * @memberof ProgressBar
   */
  setProgress(value, maxValue) {
    this._value = value;
    this._maxValue = maxValue;
    this.forceUpdate();
  }

  /**
   * 当前进度值，此值范围应在[0, maxValue]之间，如果超出此区间，会被设置到此区间内
   * 
   * @type {number}
   * 
   * @memberof ProgressBar
   */
  get value() {
    return this._value;
  }

  set value(v) {
    if (this._value !== v) {
      this._value = v;
      this._adpteValue();
      this.forceUpdate();
    }
  }

  /**
   * 最大值
   * @type {number}
   * @memberof ProgressBar
   */
  get maxValue() {
    return this._maxValue;
  }

  set maxValue(value) {
    if (this._maxValue !== value) {
      this._maxValue = value;
      this._adpteValue();
      this.forceUpdate();
    }
  }

  _adpteValue() {
    if (this._value < 0) {
      this._value = 0;
    }
    if (this._value > this._maxValue) {
      this._value = this._maxValue;
    }
  }
}

export default ProgressBar;