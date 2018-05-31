import SkinBase from './SkinBase';
import React from 'react';
/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017-9-19 10:08:04
 */
class NumberSteperButtonSkin extends SkinBase{
	render(){
		return <div className={'numberSteperButton numberSteperButton-' + this.status}></div>
	}
}

export default NumberSteperButtonSkin;