import React, { Component } from 'react';
import Config from './Config';
import Homepage from '../ui/homepage';

let marked = require('marked');
let hljs = require('highlight.js');

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-8 13:21:22
 */
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};

		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false,
			highlight: function (code) {
				return hljs.highlightAuto(code).value;
			}
		});

		fetch(Config.URL + 'readme.md').then((response) => {
			if (response.ok) {
				response.text().then((str) => {
					this.setState({ content: marked(str) });
				});
			}
		});
	}

	render() {
		return (
			<div>
				{/* <a href='#/ButtonDemo'>点我进入组件页面</a> */}
				<Homepage />
				<pre style={{ padding: '20px', whiteSpace: 'pre-line' }} >
					<code dangerouslySetInnerHTML={{ __html: this.state.content }}>
					</code>
				</pre>
			</div>


		);
	}
}
export default Index;