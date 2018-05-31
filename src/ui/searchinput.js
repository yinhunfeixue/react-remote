import React, { Component } from 'react';
import './searchinput.less';

export default class Searchinput extends Component {
  state={
    focus:false,
  }
  spread(){
    const si = this.refs.searchInput;
    if(this.state.focus && si.value){
      this.props.onSearch && this.props.onSearch(si.value);
      return;
    }
    si.focus();
    this.setState({
      focus:true,
    });
  }
  cancel(){
    this.setState({
      focus:false,
    });
  }
  search(e){
    if(e.keyCode===13){
      if(this.state.focus && e.target.value){
        this.props.onSearch && this.props.onSearch(e.target.value);
      }
    }
  }
  render() {
    return (
      <div className={`search-widget${this.state.focus?' focus':''}`}>
        <button className="search-btn" onClick={this.spread.bind(this)}>
          <i className="fa fa-search"/>
        </button>
        <button className="remove-btn" onClick={this.cancel.bind(this)}>
          <i className="fa fa-remove"/>
        </button>
        <input type="text" placeholder="搜索" ref="searchInput" onKeyUp={this.search.bind(this)}/>
        <label/>
      </div>
    );
  }
}
