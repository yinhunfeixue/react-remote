import SkinBase from './SkinBase';
import React from 'react';
import './less/List.less';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-16 10:51:06
 */
class ListSkin extends SkinBase {
	constructor(props) {
		super(props, 'list');
	}
	render(){
		return <div ref='container' className="listContainer"></div>
	}
}
export default ListSkin;
