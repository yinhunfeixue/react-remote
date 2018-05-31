import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DemoBase from './DemoBase';

class BreadcrumbDemo extends DemoBase {
	constructor(props){
		super(props);

		this.demoName = '基本属性';
	}
	renderDemo() {
		return (
			<div>
				<h5>使用数据的labe,href展示</h5>
				<Breadcrumb data={[
					{ label: '首页', href: '#/BreadcrumbDemo/1' },
					{ label: '一级', href: '#/BreadcrumbDemo/2' },
					{ label: '二级', href: '#/BreadcrumbDemo/3' },
					{ label: '三级', href: '#/BreadcrumbDemo/4' },
				]} />

				<h5>使用数据的labeFunction,hrefFunction展示</h5>
				<Breadcrumb
					labelFunction={(data, index, count) => {
						return `第${index}项，${data.name}`;
					}}

					hrefFunction={(data, index, count) => {
						return data.url;
					}}

					data={[
						{ name: '首页', url: '#/BreadcrumbDemo/1' },
						{ name: '一级', url: '#/BreadcrumbDemo/2' },
						{ name: '二级', url: '#/BreadcrumbDemo/3' },
						{ name: '三级', url: '#/BreadcrumbDemo/4' },
					]} />
			</div>
		)
	}
}
export default BreadcrumbDemo;
