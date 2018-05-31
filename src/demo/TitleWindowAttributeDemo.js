import TitleWindow from '../components/TitleWindow';
import React from 'react';
import DemoBase from './DemoBase';
import Switch from '../components/Switch';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-15 10:49:13
 */
class TitleWindowAttributeDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {
			content: <div>aaaaaaaaaaaa<br />bbbbbbbbbb</div>
		};
		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<h5>创建</h5>
				<TitleWindow>
					{
						this.state.content
					}
				</TitleWindow>

				<h5>设置标题</h5>
				<TitleWindow titleText='窗口标题'>
					{
						this.state.content
					}
				</TitleWindow>

				<h5>禁用最大化、最小化、关闭按钮</h5>
				<TitleWindow minEnable={false} maxEnable={false} closeEnable={false}>
					{
						this.state.content
					}
				</TitleWindow>

				<h5>支持拖动（开启右侧开关，窗口可拖动）<Switch changeHandler={(event)=>{
					this.refs.dragWindow.dragEnable = event.currentTarget.selected;
				}}/></h5>
				<TitleWindow ref='dragWindow'>
					{
						this.state.content
					}
				</TitleWindow>
			</div>
		);
	}
}
export default TitleWindowAttributeDemo;