import SkinBase from './SkinBase';
import InputText from '../components/TextInput';
import Button from '../components/Button';
import React from 'react';
import './less/NumberSteper.less';
import NumberSteperButtonSkin from './NumberSteperButtonSkin';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-18 10:30:54
 */

class NumerSteperSkin extends SkinBase {
	constructor(props) {
		super(props, 'numberSteper');
	}

	render() {
		return [
			<Button key='upButton' ref='upButton' skinClass={NumberSteperButtonSkin} className='btnUp' />,
			<Button key='downButton' ref='downButton' skinClass={NumberSteperButtonSkin} className='btnDown' />,
			<InputText key='inputText' ref='inputText' />
		];
	}
}

export default NumerSteperSkin;