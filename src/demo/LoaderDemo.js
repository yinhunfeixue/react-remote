import DemoBase from './DemoBase';
import Button from '../components/Button';
import React from 'react';
import Loader from '../net/Loader';
import UrlRequest from '../net/UrlRequest';
import ProgressBar from '../components/ProgressBar';
import ProgressEvent from '../events/ProgressEvent';
import RemoteEvent from '../events/RemoteEvent';
import Alert from '../components/Alert';
import MultipleLoader from '../net/MultipleLoader';
import DataEvent from '../events/DataEvent';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-26 17:09:51
 */
class LoaderDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '使用方法';
	}

	btn_clickHandler = (event) => {
		let loader = new Loader();
		loader.addEventListener(ProgressEvent.PROGRESS, (event) => {
			this.refs.pb.setProgress(event.bytesLoaded, event.bytesTotal);
		});
		loader.addEventListener(RemoteEvent.COMPLETE, (event) => {
			debugger;
			Alert.show('加载完成');
			this.refs.img.src = window.URL.createObjectURL(event.data);
		});

		let request = new UrlRequest('http://10.39.183.51:8080/a.png');
		request.contentType = 'blob';
		loader.load(request);
	}

	btnMultiple_clickHandler = (event) => {
		this.refs.mbtn.enable = false;
		let mloader = new MultipleLoader();

		this.timerId = setInterval(() => {
			this.refs.mInfo.innerHTML = `平均速度${(mloader.avgSpeed / 1024 / 1024).toFixed(2)}M/s 即时速度：${(mloader.speed / 1024 / 1024).toFixed(2)}M/s`;
		}, 1000);

		mloader.addEventListener(ProgressEvent.PROGRESS, (event) => {
			this.refs.pbTotal.setProgress(event.bytesLoaded, event.bytesTotal);
		});

		mloader.addEventListener(DataEvent.ITEM_COMPLETE, (event) => {
			let loader = event.data;
			this.refs.mLog.innerHTML += `加载${loader.status === Loader.COMPLETE ? '成功' : '失败'}:${event.data.urlRequest.url}<br/>`;
		});

		mloader.addEventListener(RemoteEvent.COMPLETE, (event) => {
			this.refs.mbtn.enable = true;
			clearInterval(this.timerId);

			this.refs.mInfo.innerHTML = `加载成功：${mloader.sucessedNumber} 加载失败:${mloader.errorNumber}`;
		});

		for (let i = 1; i <= 10; i++) {
			let urlRequest = new UrlRequest(`http://10.39.183.51:8080/${i}.dmg`);
			let urlRequest2 = new UrlRequest(`http://10.39.183.51:8080/${i}.png`);
			mloader.addItem(urlRequest);
			mloader.addItem(urlRequest2);
		}
	}
	renderDemo() {
		return (
			<div>
				<h5>单文件加载器</h5>
				<Button label='点击开始下载' onClick={this.btn_clickHandler} />
				<ProgressBar ref='pb' />
				<img ref='img' alt='img' width='600px' />

				<h5>多文件加载器</h5>
				<p>本示例加载多个文件，可使用开发者工具观察并控制浏览器速度，以观察下载情况</p>
				<Button ref='mbtn' label='点击开始下载多个文件' onClick={this.btnMultiple_clickHandler} />
				<ProgressBar ref='pbTotal' labelFunction={(value, maxValue) => {
					return (100 * value).toFixed(2) + '%';
				}} />
				<div ref='mInfo'></div>
				<div ref='mLog'></div>
			</div>
		);
	}
}
export default LoaderDemo;