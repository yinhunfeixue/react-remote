import React, { Component } from 'react';
import './App.css';
import './ui/ui.less';
import Tree from './components/Tree';
import TreeNodeData from './core/TreeNodeData';
import Routers from './demo/Routers';
import Config from './demo/Config';
import Head from './ui/head';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from './demo/Index';

// import TextInput from './components/TextInput';

class App extends Component {

  constructor(props) {
    super(props);

    let treeData = [
      new TreeNodeData({ hash: 'ButtonDemo', label: '按钮' }),
      new TreeNodeData({ hash: 'ToggleButtonDemo', label: '切换按钮' }),
      new TreeNodeData({ hash: 'SwitchDemo', label: '开关' }),
      new TreeNodeData({ hash: 'RadioButtonDemo', label: '单选框' }),
      new TreeNodeData({ hash: 'CheckBoxDemo', label: '多选框' }),
      new TreeNodeData({ hash: 'TextInputDemo', label: '文本框' }),
      new TreeNodeData({ hash: 'NumberSteperDemo', label: '步进输入框' }),
      new TreeNodeData({ hash: 'ProgressBarDemo', label: '进度条' }),
      new TreeNodeData({ hash: 'PickerDemo', label: '滑动选择器' }),
      new TreeNodeData({ hash: 'AlertDemo', label: '警告框' }),
      new TreeNodeData({ hash: 'TitleWindowDemo', label: '窗口' }),
      new TreeNodeData({ hash: 'DropListDemo', label: '下拉框' }),
      new TreeNodeData({ hash: 'BreadcrumbDemo', label: '面包屑' }),
      new TreeNodeData({ hash: 'MenuDemo', label: '菜单' }),
      new TreeNodeData({ hash: 'TreeDemo', label: '树' }),
      new TreeNodeData({ hash: 'HSliderDemo', label: '滑块' }),
      new TreeNodeData({ hash: 'ListDemo', label: '列表' }),
      new TreeNodeData({ hash: 'ViewStackDemo', label: '选项卡' }),
      new TreeNodeData({ hash: 'ChangeSkinDemo', label: '动态换肤', noApi: true }),
      new TreeNodeData({ hash: 'DragerDemo', label: '拖动器' }),
      new TreeNodeData({ hash: 'LoaderDemo', label: '加载器' }),
    ];

    this.state = {
      treeData
    };
  }

  componentDidMount() {
    this.selectedByHash();

    window.onhashchange = (event) => {
      this.selectedByHash();
    }
  }

  selectedByHash() {
    if (this.refs.tree) {
      let key = window.location.hash;
      key = key.substring(key.indexOf('#/') + 2);

      let selectedValue = this.refs.tree.selectedValue;
      if (!selectedValue || key !== selectedValue.value.hash) {
        this.switchToKey(key);


      }
    }
  }


  pbLabelFun(value, maxValue) {
    return value + '/' + maxValue;
  }

  tree_changeHandler = (event) => {
    window.location.hash = event.data.value.hash;
  }

  tbKey_enterHandler = (value) => {
    this.switchToKey(value);
  }

  switchToKey(key) {
    if (key) {
      let item = this.search(key);
      if (item) {
        this.refs.tree.selectedValue = item;
      }
    }
  }

  search(key) {
    for (let i = 0; i < this.state.treeData.length; i++) {
      let item = this.state.treeData[i];
      if (item.value.label.indexOf(key) >= 0 || item.value.hash.toLowerCase().indexOf(key.toLowerCase()) >= 0) {
        return item;
      }
    }
    return null;
  }

  render() {
    // return <TextInput maxChars={10}/>;
    return (
      <div className='demo'>
        <Head onSearch={this.tbKey_enterHandler} />
        <HashRouter>
          <Switch>
            <Route path='/' component={Index} exact />
            <Route>
              <div className='content'>
                <Tree ref='tree' className='componentTree' data={this.state.treeData} changeHandler={this.tree_changeHandler}
                  labelFunction={(data) => {
                    return (
                      <div>
                        <span>{data.value.label}</span>
                        {
                          !data.value.noApi &&
                          <a className='href-api' href={Config.URL + 'out/' + data.value.hash.replace('Demo', '') + '.html'} target='_blank'>API文档</a>
                        }
                      </div>
                    )
                  }} />
                <div className='componentCanvas'>
                  <Routers />
                </div>
              </div>
            </Route>
          </Switch>
        </HashRouter>
        <div className='contact'>
          <span>邮箱: yinhunfeixue@163.com</span>
          <span>微信：yinhunfeixue</span>
        </div>
      </div>
    );
  }
}

export default App;
