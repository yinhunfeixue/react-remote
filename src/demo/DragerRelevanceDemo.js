import DemoBase from './DemoBase';
import React from 'react';
import Button from '../components/Button';
import Drager from '../core/Drager';

/**
 * 
 * @author : xujunjie (yinhunfeixue@163.com)
 * @date   : 2017-12-14 13:22:23
 */
class DragerRelevanceDemo extends DemoBase {
	constructor(props) {
		super(props);
		this.state = {};
		this.demoName = '关联拖动器';
	}
	componentDidMount = () => {

		let target = this.refs.divDrager;
		let displayTarget = this.refs.btn.rootComponent;
		new Drager().bind(target, displayTarget);
	}


	renderDemo() {
		return (
			<div>
				<h5>拖动A，移动B--new Drager().bind(A, B);</h5>
				<div style={{ position: 'relative' }}>
					<div ref='divDrager' style={{ width: '300px', height: '300px', backgroundColor: '#eee' }}>
						<span>我是触控板，在我上面拖动，右边的按钮会移动</span>
					</div>
					<Button ref='btn' style={{ left: '400px', position: 'absolute', transition: 'none', top: '100px' }} label='我被触控板控制' />
				</div>
			</div>
		);
	}
}
export default DragerRelevanceDemo;