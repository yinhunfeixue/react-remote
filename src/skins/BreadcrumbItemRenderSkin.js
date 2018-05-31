import SkinBase from './SkinBase';
import React from 'react';
import './less/Breadcrumb.less';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-29 15:26:54
 */

class BreadcrumbItemRenderSkin extends SkinBase {
	render() {
		return (
			<span className={this.getClassByStatus('breadcrumb')}>
				<a href={this.target.href}>{this.target.label}</a>
				{
					this.target.index !== this.target.count - 1 &&
					<span>/</span>
				}

			</span>
		);
	}
}

export default BreadcrumbItemRenderSkin;