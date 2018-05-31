import ListBase from './supports/ListBase';
import ListItemRender from './ListItemRender';
import ListSkin from '../skins/ListSkin';

/**
 * 列表组件，依次排列显示多个子项。可设置是否允许选中。
 * 
 * <h2>皮肤结构</h2>
 * <ul>
 *   <li>container 表示子项的父容器</li>
 * </ul>
 * 
 * 默认子项为{@link ListItemRender}，List会给子项传下面几项数据
 * data——携带的数据
 * index——当前数据在数据集合的位置
 * selected——当前项是否选中
 * label——默认的文本内容
 * 
 * 支持自定义子项，如需自定义子项，设置itemClassType的值即可。自定义子项建议继承自ListItemRender
 * @example <caption>创建List</caption>
 * <List data={this.state.articleData} itemClassType={ArticleItem} style={{ width: '690px', marginTop: '30px' }} />
 * 
 * //ArticleItem类代码如下
 * class ArticleItem extends ListItemRender {
 * 	render() {
 * 		let article = this.data;
 * 		
 * 		return (
 * 			<div className='articleItem'>
 * 				<div className='subject'>来自话题：{article.subject}</div>
 * 				<div className='title'>{article.title}</div>
 * 				<div className='author'>{article.author}</div>
 * 				<div className='content'>{article.content}</div>
 * 			</div>
 * 		);
 * 	}
 * }
 * export default ArticleItem;
 * 
 * //创建文章数据代码如下
 * let data = [];
 * 	for (let i = 0; i < 10; i++) {
 * 		let article = new ArticleData('JAVASCRIPT', '标题', 'Skillness', '文章内容', 5, 100, 8);
 * 		data.push(article);
 * 	}
 * 	this.state = { articleData: data };
 * 
 * @author xujunjie
 * @mail yinhunfeixue@163.com
 * @date 2017-10-16 09:27:22
 * 
 * @extends ListBase
 */
class List extends ListBase {

	_createItemProps(data, index) {
		let result = super._createItemProps(data, index);
		if (this.selectedAble && index === this.selectedIndex) {
			result.selected = true;
		}
		else {
			result.selected = false;
		}
		result.labelFunction = this.labelFunction;
		result.selectedAble = this.selectedAble;
		result.changeHandler = this.item_changeHandler;
		return result;
	}

	item_changeHandler = (event) => {
		let target = event.currentTarget;
		if (target.selected) {
			let index = target.index;
			this.selectedIndex = index;
		}
	}

	_getDefaultSKinClass() {
		return ListSkin;
	}

	/**
	 * @inheritdoc
	 */
	_initProperty() {
		super._initProperty();
		this._selectedAble = true;
		this._itemClassType = ListItemRender;
	}

	/**
	 * 是否可选中
	 * 
	 * @type {boolean}
	 * @default true
	 */
	get selectedAble() {
		return this._selectedAble;
	}
	set selectedAble(value) {
		if (this._selectedAble !== value) {
			this._selectedAble = value;
			if (this._selectedAble === false) {
				this.selectedIndex = -1;
			}
			this.forceUpdate();
		}
	}
}
export default List;
