import React from 'react';
import SkinBase from './SkinBase';
import TextInput from '../components/TextInput';
import List from '../components/List';
import './less/DropList.less';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-20 14:53:17
 */
class DropListSkin extends SkinBase {

	render() {
		return (
			<div className={this.getClassByStatus('dropList')}>
				<TextInput className='dropList-textInput' ref='dropTextInput' />
				<div className='dropList-arrow'></div>
				<List className='dropList-list' ref='dropList' />
			</div>


		);
	}
}
export default DropListSkin;
