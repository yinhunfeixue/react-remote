import React from 'react';
import DemoBase from './DemoBase';
import ViewStack from '../components/ViewStack';
import ButtonBar from '../components/ButtonBar';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-1 10:19:34
 */
class ViewStackAttributeDemo extends DemoBase {

	constructor(props) {
		super(props);
		let divStyle = {
			width: '300px',
			height: '100px',
			border: '2px solid black'
		};
		this.state = {
			index: 1,
			divStyle,
			children: [
				<div style={divStyle} key='1'>1</div>,
				<div style={divStyle} key='2'>2</div>,
				<div style={divStyle} key='3'>3</div>,
				<div style={divStyle} key='4'>4</div>
			]
		};


		this.demoName = '基本属性';
	}

	renderDemo() {
		return (
			<div>
				<h5>和buttonbar结合的选项卡</h5>
				<div>可以把ButtonBar放在任何位置，不一定要把两者放在起</div>
				<ButtonBar selectedIndex={this.state.index} data={['a', 'b', 'c', 'd']} changeHandler={(event) => {
					this.setState({ index: event.target.selectedIndex });
				}} />
				<hr />
				<ViewStack ref='viewStack' selectedIndex={this.state.index}>
					<div ref='div1' style={this.state.divStyle} key='1' onClick={(event)=>{
						this.refs.div1.innerText = '111';
					}}>1</div>
					<div style={this.state.divStyle} key='2'>2</div>
					<div style={this.state.divStyle} key='3'>3</div>
					<div style={this.state.divStyle} key='4'>4</div>
				</ViewStack>
			</div >
		);
	}
}
export default ViewStackAttributeDemo;