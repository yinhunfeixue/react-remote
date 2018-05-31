import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import DropListDemo from './DropListDemo';
import BreadcrumbDemo from './BreadcrumbDemo';
import MenuDemo from './MenuDemo';
import ButtonDemo from './ButtonDemo';
import TextInputDemo from './TextInputDemo';
import ToggleButtonDemo from './ToggleButtonDemo';
import SwitchDemo from './SwitchDemo';
import CheckBoxDemo from './CheckBoxDemo';
import AlertDemo from './AlertDemo';
import SliderDemo from './SliderDemo';
import ListDemo from './ListDemo';
import ViewStackDemo from './ViewStackDemo';
import RadioButtonDemo from '../demo/RadioButtonDemo';
import NumberStepDemo from './NumberStepDemo';
import PickerDemo from './PickerDemo';
import ChangeSkinDemo from './ChangeSkinDemo';
import TreeDemo from './TreeDemo';
import DragerDemo from './DragerDemo';
import TitleWindowDemo from './TitleWindowDemo';
import ProgressBarDemo from './ProgressBarDemo';
import LoaderDemo from './LoaderDemo';
import './demo.less';
/**
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-11-22 09:42:02
 */
class Routers extends Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route path='/ButtonDemo' component={ButtonDemo} />
					<Route path='/ToggleButtonDemo' component={ToggleButtonDemo} />
					<Route path='/SwitchDemo' component={SwitchDemo} />
					<Route path='/RadioButtonDemo' component={RadioButtonDemo} />
					<Route path='/CheckBoxDemo' component={CheckBoxDemo} />
					<Route path='/TextInputDemo' component={TextInputDemo} />
					<Route path='/AlertDemo' component={AlertDemo} />
					<Route path='/TitleWindowDemo' component={TitleWindowDemo} />
					<Route path='/DropListDemo' component={DropListDemo} />
					<Route path='/BreadcrumbDemo' component={BreadcrumbDemo} />
					<Route path='/MenuDemo' component={MenuDemo} />
					<Route path='/HSliderDemo' component={SliderDemo} />
					<Route path='/ListDemo' component={ListDemo} />
					<Route path='/ViewStackDemo' component={ViewStackDemo} />
					<Route path='/NumberSteperDemo' component={NumberStepDemo} />
					<Route path='/PickerDemo' component={PickerDemo} />
					<Route path='/TreeDemo' component={TreeDemo} />
					<Route path='/ChangeSkinDemo' component={ChangeSkinDemo} />
					<Route path='/DragerDemo' component={DragerDemo} />
					<Route path='/ProgressBarDemo' component={ProgressBarDemo} />
					<Route path='/LoaderDemo' component={LoaderDemo} />
				</Switch>
			</HashRouter>
		);
	}
}
export default Routers;
