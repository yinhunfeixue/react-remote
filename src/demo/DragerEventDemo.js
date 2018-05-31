import DemoBase from './DemoBase';
import React from 'react';
import Button from '../components/Button';
import Drager from '../core/Drager';
import MoveEvent from '../events/MoveEvent';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2018-1-4 18:44:40
 */
class DragerEventDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '拖动器事件';
	}

	componentDidMount = () => {
		console.log('move');
		let drager = new Drager();
		drager.addEventListener(MoveEvent.MOVE_START, this.moveStartHandler);
		drager.addEventListener(MoveEvent.MOVEING, this.moveMovingHandler);
		drager.addEventListener(MoveEvent.MOVE_END, this.moveMoveEndHandler);
		drager.bind(this.refs.btn.rootComponent);
	}

	moveStartHandler = (event) => {
		this.refs.pInfo.innerHTML += `开始拖动:${event.x}, ${event.y}<br/>`;
	}

	moveMovingHandler = (event) => {
		this.refs.pInfo.innerHTML += `拖动中:${event.x}, ${event.y}<br/>`;
	}

	moveMoveEndHandler = (event) => {
		this.refs.pInfo.innerHTML += `拖动结束:${event.x}, ${event.y}<br/>`;
	}



	renderDemo() {
		return (
			<div>
				<div style={{ border: '1px solid gray', position: 'relative', minHeight: '500px' }}>
					<Button ref='btn' style={{ zIndex: '5', position: 'absolute', transition: 'none' }} label='我被拖动时，会触发事件' />
					<p ref='pInfo' style={{ position: 'absolute', right: '0', top: '0', bottom: '0', overflow: 'auto' }}></p>
				</div>
			</div >
		);
	}

}
export default DragerEventDemo;