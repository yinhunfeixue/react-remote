import React, { Component } from 'react';
// import TextInput from '../components/TextInput';
import Searchinput from './searchinput';
import './head.less';

export default class Homepage extends Component {
  constructor(props){
    super(props);
      const ishome = window.location.href.split('#')[1] === '/';
      this.state={
      scroll:ishome?'top':'middle',
      ishome:ishome,
    };
  }
  componentDidMount(){
    //监听地址栏的变化
    window.addEventListener('hashchange', this.judgeIshome, false);
    //监听网页滑动位置
    if(this.state.ishome){
      document.addEventListener('scroll',this.judgeTop,false);
    }
  }
  judgeIshome=()=>{
    const ishome = window.location.href.split('#')[1] === '/';
    if(ishome){
      document.addEventListener('scroll',this.judgeTop,false);
    }else{
      document.removeEventListener('scroll', this.judgeTop);
    }
    this.setState({
      scroll:ishome?'top':'middle',
      ishome:ishome,
    });
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.judgeIshome);
    document.removeEventListener('scroll', this.judgeTop);
  }
  judgeTop=()=>{
    const a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const b = document.documentElement.scrollTop===0? document.body.scrollTop : document.documentElement.scrollTop;
    const c = document.documentElement.scrollTop===0? document.body.scrollHeight : document.documentElement.scrollHeight;
    if(document.body.scrollTop===0&&document.documentElement.scrollTop===0){//到达顶端
      this.setState({scroll:'top'});
    }
    else if(a+Math.floor(b)===c || a+Math.ceil(b)===c){//到达底部
      this.setState({scroll:'bottom'});
    }else{//中间位置
      this.setState({scroll:'middle'});
    }
  }
  backtop(){
    document.documentElement.scrollTop = document.body.scrollTop =0;
  }
  jumphome(){
    window.location.href='#/';
  }
  render() {
    return (
      <div className={`head${this.state.scroll==='top'?' scroll-top':' scroll-middle'}`}>
        <div className="routate-title" onClick={this.jumphome.bind(this)}>React-Remote</div>
        <img src={require('./images/mask.png')} alt="logo" className="logo-img" key="logo"/>
        <a className='title' href='#/' key="title">React-Remote</a>
        <Searchinput onSearch={this.props.onSearch}/>
        <div className='head-menu'>
          <a href='#/'>首页</a>
          <a href='#ChangeSkinDemo'>换肤示例</a>
          <a href='#/ButtonDemo'>组件</a>
          <a href="https://git.oschina.net/yinhunfeixue/react-remote" target="_blank" rel="noopener noreferrer"><img src={require('./images/Git.png')} alt="git.png"/></a>
        </div>
        <div className={`backtop${this.state.scroll!=='top'?' effective':''}`} onClick={this.backtop.bind(this)}>
          <i className="fa fa-angle-double-up"/>
          {/* <img src={require('./ui/images/backtop.png')} alt="backtop.png"/> */}
        </div>
      </div>
    );
  }
}
