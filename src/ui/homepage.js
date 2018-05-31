import React, { Component } from 'react';
import RadioButton from '../components/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroup';
import SkinBase from '../skins/SkinBase';
import Drager from '../core/Drager';
import './homepage.less';
import HtmlUtil from '../utils/HtmlUtil';

const imgarr = [
  require('./images/bg1_01.jpg'),
  require('./images/bg1_02.jpg'),
  require('./images/bg1_03.jpg'),
  require('./images/bg1_04.jpg'),
  require('./images/bg1_05.jpg'),
];
export default class Homepage extends Component {

  rbGroup = new RadioButtonGroup();
  jumpSkinComp() {
    window.location.href = '#/ChangeSkinDemo';
  }
  jumpDragComp() {
    window.location.href = '#/DragerDemo';
  }
  componentDidMount() {


  }

  ex2_loadHandler = (event) => {
    let target = this.refs.divDrager;
    let displayTarget = this.refs.btn;
    let displayTargetPositon = HtmlUtil.getLeftTop(displayTarget);
    let rectangle = HtmlUtil.getRectangleToPage(this.refs.ex2);       //背景图的尺寸
    let cloudRectangle = HtmlUtil.getRectangleToPage(target);         //云的尺寸
    new Drager().bind(target, displayTarget, false, 0, rectangle.width - cloudRectangle.width, displayTargetPositon.y, displayTargetPositon.y);
    new Drager().bind(target, null, false, 0, rectangle.width - cloudRectangle.width, 0, rectangle.height - cloudRectangle.height);
  }
  render() {
    return (
      <div className="home-page">
        <div className="part1">
          <div className="ex1">
            {
              imgarr.map(((value) => {
                return <RadioButton key={value} label={value} value={value} group={this.rbGroup} skinClass={NewSkin} />
              }))
            }
          </div>
          <div className="ex1-intro">
            <h3>React-Remote，一个专注于逻辑处理的组件库</h3>
            <h4>让您随心所欲地给页面"塑颜"</h4>
            <h4>让门户开发更简单</h4>
            <div className="home-btn" onClick={this.jumpSkinComp.bind(this)}>查看组件实例</div>
            <div className="home-smile-div"><img src={require('./images/smile.png')} alt="smile.png" /><span>点击左边图片有惊喜！</span></div>
          </div>

        </div>
        <div className="part2">
          <div className="ex2-info">
            <h3>逻辑抽离得恰当好处的基础组件</h3>
            <h4>让您愉快地构建各种复合组件</h4>
            <h4>轻松应对多种业务场景</h4>
            <div className="home-btn" onClick={this.jumpDragComp.bind(this)}>查看组件实例</div>
            <div className="home-smile-div"><span>拖动右边图片的白云有惊喜！</span><img src={require('./images/smile.png')} alt="smile.png" /></div>
          </div>
          <div ref='ex2' className="ex2">
            <img src={require('./images/bg2.png')} alt="bg2.png" className="img-bg2" onLoad={this.ex2_loadHandler} />
            <div ref="divDrager" className='div-img-cloud'></div>
            <img src={require('./images/runningman.png')} alt="runningman.png" className="img-runningman" ref="btn" />
          </div>

        </div>
      </div>
    );
  }
}
class NewSkin extends SkinBase {
  constructor(props) {
    super(props, 'myRadio');
  }
  render() {
    return (
      <div className={`custom-radio${this.target.selected ? ' selected' : ''}`}>
        <img src={this.target.label} alt={this.target.label} />
      </div>
    );
  }
}


