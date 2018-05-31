import React from 'react';
import SkinBase from './SkinBase';
import './less/Tree.less';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-24 17:42:06
 */
class TreeSkin extends SkinBase {

	render() {
		return (
			<div className='tree' ref='container'></div>
		);
	}
}
export default TreeSkin;
