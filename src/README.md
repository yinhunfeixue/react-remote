## 安装 npm i react-remote

## [官网 www.react-remote.com](http://www.react-remote.com)


# 为什么使用remote
react-remote 致力于提供丰富的逻辑功能和和自由拆解的外观组件。同时，还包含一套前端常用的工具库

+ ## 逻辑和外观（DOM结构）分离，自由定制外观却仍能复用逻辑。
不论组件的外观设计多么精美，在大部分商业项目中，设计师也很少会直接使用，事实上同一个设计师每次设计组件外观都大相径庭，即使这些组件功能完全一致。

传统的解决方法有两种：
+ **重写逻辑和外观**——缺点：大量的重复代码，很多“复制粘贴”正是由此而来
+ **先隐藏默认外观，再添加新外观元素**——缺点：增加了隐藏默认外观的工作量，增加了页面上元素

既然只有外观改变，为什么不能只重写外观？既然默认外观用不上，为什么不能直接丢弃默认外观？
remote组件库出发点即在于此，通过逻辑和外观的解构，组件逻辑类和组件外观类完全分离，通过skinClass属性关联。当需要使用新的外观时，你只需要从0开始写外观类，然后把外观类设置为skinClass属性的值，无需重写逻辑，也无需先隐藏默认外观。

**当然，remote的默认皮肤也足以满足大部分后台需求**。

+ ## 接口名称统一
当你用了一两个remote的组件后，几乎就能猜到其它组件的属性和接口名称。例如label表示短小文字，text表示大段文字，value表示当前值，selectedValue表示选中值……
在每个组件中，相同功能的属性都具有一样的名称。不仅如此，remote的所有事件处理函数，都和原生js事件一样，有且只有一个event参数。

+ ## 强大的工具包
事实上，除了组件库，remote还包含一套工具库，例如：可设置限制区域的元素拖动器、获取元素相对窗口/相对页面的位置和占用区域、支持循环引用的深拷贝……
更多工具包，还会不断以合理易用的形式添加进来

# 概述
一个完整的组件包含三部分
1. 组件类——定义组件的数据、逻辑功能
2. 皮肤类——定义组件的外观DOM结构，包含拥有的元素、层级关系、和组件类数据的联系
3. 样式类——CSS文件，定义皮肤类中DOM结点的样式

## 开始使用react-remote

下面以输入框为例，进行组件的创建、属性修改、事件监听

1. 创建组件
	```
	<TextInput  ref='tb' text='第一段文字'/>
	```

2. 读取和设置属性——使用组件时，有两种方法可设置组件属性。
	```
	//通过props传递
	<TextInput ref='tb' text={this.state.text} />
	this.setState({text:'一段新的文字'});

	//获取组件实例并设置属性
	this.refs.tb.text = '一段新的文字';
	```
	如果组件的值只需要在最后提交时使用，则不必和传统react代码一样，在state中保存属性，只需要在最后使用时，通过下面的代码读取组件值即可
	```
	this.refs.tb.text;

	```
	
	**特别需要注意的是，上面的代码并不意味着在react-remote中，props变得可写了。**

	**text本质是TextInput的属性，是this.text而不是this.props.text；只不过，react-remote把props做为传递属性的工具而已**

3. 添加事件监听，react-remote所有事件函数的参数都只有一个：event。event可能是原生JS事件对象、RemoteEvent类实例、RemoteEvent子类的实例
	
	在props中设置事件处理函数，此方法会替换掉之前使用props设置的处理函数
	```
	<TextInput ref='tb' text='第一段文字' changeHandler={this.tb_changeHandler}/>
	```

	如果添加监听后，希望之前的事件处理函数仍然保留，需要使用addEventListener函数监听事件
	```
	this.refs.tb.addEventListener(RemoteEvent.CHANGE, this.tb_changeHandler);
	```

	事件处理函数的参数只有一个，是下面三种对象的一种：原生JS事件对象、RemoteEvent类实例、emoteEvent子类的实例
	```
	tb_changeHandler = (event)=>{
		//currentTarget为添加事件处理函数的对象
		let currentTarget = event.currentTarget;    
			
		//target为发出事件的对象
		let target = event.target;			
	}

	```

## 自定义CSS样式
remote的组件都默认提供了一组外观状态属性，例如Button类包含下面的状态
+ 'unable'	不可用的状态
+ 'down'		鼠标/手指 按下的状态
+ 'over'		鼠标移上但是未按下的状态（移动端无此状态）
+ ''				默认状态


组件的class名称通常为：组件名称 + 状态名称，例如:button-unable。可通过修改css来改变组件样式

*每种组件包含的外观状态，可参考API文档中每个组件的 **_getCurrentSkinStatus()** 方法*


## 自定义皮肤
如果修改css无法满足外观需求（例如文本框有多层图片），可以通过创建自定义皮肤实现外观。
1. 创建皮肤类：MyTextInputSkin.js

	创建皮肤类，有两点要注意
	+ this.getClassByStatus(preName）——此方法传入样式前缀名称，返回结果为'前缀-组件状态'（例如 button-unable），用于设置不同状态下className的值
	+ this.target——表示组件本身，如果组件提供的皮肤状态无法满足样式需要，可使用this.target的任意属性来进行状态判断和计算
	```
	class MyTextInputSkin extends SkinBase{
		render(){

			//myTextInput 表示className前缀。最终生成的className值为：myTextInput、myTextInput-unable等
			return (
				<div className={this.getClassByStatus('myTextInput')}>	
					<img sr='1.jpg' className='img1'/>
					<img sr='2.jpg' className='img2'/>
					<img sr='3.jpg' className='img3'/>

					//this.target表示组件本身
					<input ref='inputNode' type='text' placeholder={this.target.placeholder} className='myInput'/>
				</div>
			);
		}
	}
	```

2. 创建皮肤类的样式文件：MyTextInputSkin.less

	```
	.myTextInput{
		.img1{
			//img1的css样式
		}
		.img2{
			//img2的css样式
		}
		.img3{
			//img3的css样式
		}
		.myInput{
			//myInput的css样式
		}
	}

	.myTextInput-unable{
		//组件不可用时的样式
	}
	```

3. 设置组件的皮肤类

	```
	//jsx语法设置
	<TextInput ref='tb' text={this.state.text} skinClass={MyTextInputSkin}/>

	//js语法设置
	this.refs.tb.skinClass = MyTextInputSkin;
	```


# 自定义组件
**如果你需要基于react-remote组件库定义你自己的组件，请阅读此段内容。**

## 组件类
+ 默认属性—— 在_initProperty() 方法中设置组件默认属性值
+ 默认皮肤—— _getDefaultSKinClass() 方法定义组件的默认皮肤类
+ 绘制组件——组件本身只包含一层容器，真正的组件结构在皮肤类中进行
+ 初始化皮肤——在_initSkin()函数中对皮肤进行初始化， 例如属性设置、事件监听、render皮肤中的容器（例如，list的子项渲染到皮肤的container容器中）
+ 销毁皮肤——在_unstallSkin()函数中对皮肤使用的资源进行销毁，尤其是事件监听

除非你十分确定，否则自定义组件应继承自 [SkinnableComponent]



## 皮肤类
皮肤类用于定义组件的外观，详情请参考上一节: 自定义皮肤。皮肤类的基类是[SkinBase]

## 创建自定义组件流程
1. 创建组件类NewComponent，此类是SkinnableComponent的子类
	```
	class NewComponent extends SkinnableComponent{
		
	}
	```

	+ **重写_initProperty函数，设置组件属性的默认值**
	```
	_initProperty(){
		super._initProperty();

		//在这里写你的组件新增的属性
		this._newAttribute = 0;
	}
	```

	+ **如果属性需要在外部访问（通过jsx, refs访问），添加get set**
	```
	get newAttribute(){
		return this._newAttribute;
	}
	set newAttribute(value){
		if(this._newAttribute !=== value){
			this._newAttribute = value;
			//还可以做一些其它的操作
		}
	}
	```

	+ **定义组件外观状态**
	```
	_getCurrentSkinStatus() {
		if(value){
			return '';
		}
		else{
			return 'empty';
		}
	}
	```

2. 创建皮肤类:NewSkin.js，此类是SkinBase的子类。重写render()函数，设置外观结构
	```
	class NewSkin extends SkinBase{
		render(){
			return (
				<div className={this.getClassByStatus(newComponentClass)}>
					<img className='icon' ref='icon' src={this.target.icon}/>
					<span className='spanCssClass'>{this.target.value}</span>
				</div>
			);
		}
	}
	```

3. 重写组件类皮肤相关的函数

	1. 重写组件类的_initSkin()函数，设置监听
	```
		_initSkin(){
		//给皮肤中的图片添加点击监听
		this.findSkinPart('icon').addEventListener('click', this.btnClickHandler);
	}
	```

	2. 重写组件类的_unstallSkin()函数，设置皮肤实例的销毁操作
	```
	_unstallSkin(){
		//移除皮肤中图片的点击监听
		this.findSkinPart('icon').removeEventListener('click', this.btnClickHandler);
	}
	```

	3. 重写组件类的_getDefaultSKinClass()，设置组件的默认皮肤
	```
	_getDefaultSKinClass(){
		//返回新建的组件皮肤类
		return newSkinClass;
	}
	```
	
3. 创建样式文件，设置皮肤类中元素的的样式，此处以less文件为例

	```
	.newComponentClass{
		.icon{
			width:50px;
		}
		.spanCssClass{
			font-size:16px;
			color:black;
		}
	}

	.newComponentClass-empty{

	}
	```

	至此，组件、皮肤类、样式文件全部创建完成