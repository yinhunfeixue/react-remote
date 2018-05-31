import React from 'react';
import { Component } from 'react';
import Config from './Config';
let hljs = require('highlight.js');
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-24 10:22:24
 */
class DemoBase extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};

		this._display = 'hiddlen';
	}

	componentDidMount = () => {

	}


	imgCode_clickHandler = (event) => {
		let currentIsClose = (this._display === 'hiddlen');
		this._display = currentIsClose ? 'show' : 'hiddlen';
		if (this._display === 'show' && !this.state.code) {
			let name = this.constructor.name;
			fetch(Config.URL + 'demo/' + name + '.js', {
				headers: { 'Content-Type': 'text/plain' },
			}).then((response) => {
				if (response.ok) {
					response.text().then((str) => {
						str = str.replace(/(.*---.*[\r\n]+|.*demoName.*[\r\n]+)/g, '');
						str = str.replace('renderDemo', 'render');
						str = str.replace(/import DemoBase from.*[\r\n]+/g, "import { Component } from 'react';\r\n");
						str = str.replace(/DemoBase/g, 'Component');
						str = str.replace(/\.\.\/(components|core|events|manager|net|skins|utils)/, "react-remote/$1");
						this.setState({ code: hljs.highlightAuto(str).value });
					}
					);
				}
			})
		}
		this.forceUpdate();
	}

	renderDemo() {

	}

	_renderCode() {
		return (
			<div>
				<pre className={this._display}>
					<code dangerouslySetInnerHTML={{ __html: this.state.code ? this.state.code : '正在加载源码……' }} />
				</pre>
			</div>
		);
	}

	render() {
		return (
			<div className='div-demo'>
				<div className='title'>
					<span>{this.demoName} </span>
					<img alt='code' src={require('./icons/code.svg')} className='iconCode' onClick={this.imgCode_clickHandler} />
				</div>
				{
					this._renderCode()
				}
				{
					this.renderDemo()
				}

			</div>
		);
	}
}
export default DemoBase;
