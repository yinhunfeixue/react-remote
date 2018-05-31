/**
 * EventDispatcher类是可分派事件的所有运行时类的基类
 */
class EventDispatcher {
  constructor() {
    //events是一个字典，键:事件类型，值：每一项是{优先级，函数}的数组。结构如下
    //events[type] = [{priority, fun}, {priority, fun}, {priority, fun}, ...]
    this.events = new Map();
  }

  /**
   * 添加事件监听
   * 如果相同类型的事件，已添加过相同的处理函数，则不再添加
   * @param {string} type 事件类型
   * @param {function} fun 要添加的函数，函数有一个参数event 
   * @param {number} priority 优先级，值越大，越先执行。同一优先级的，按添加顺序执行，先添加先执行
   */
  addEventListener(type, fun, priority = 0) {
    if (!this.events.has(type))
      this.events.set(type, []);

    //如果已添加过，不再添加
    if (this._searchFunIndexWithType(fun, type) >= 0)
      return;


    let newItem = { 'priority': priority, 'fun': fun };

    //找到优选级小于当前priority的位置插入，如果没有，则插入到末尾
    let arr = this.events.get(type);
    for (let i = 0; i <= arr.length; i++) {
      if (i === arr.length) {
        arr.push(newItem);
        break;
      }
      else if (arr[i].priority < priority) {
        arr.splice(i, 0, newItem);
        break;
      }
    }
  }

  /**
   * 查找某个监听处理方法在队列中的序号
   * @param {function} fun 
   * @param {string} type 
   * 
   * @private
   */
  _searchFunIndexWithType(fun, type) {
    if (this.events == null || !this.events.has(type))
      return -1;

    let arr = this.events.get(type);
    for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element.fun === fun)
        return i;
    }
    return -1;
  }

  /**
   * 判断是否注册了针对某个事件类型的监听
   * @param {string} type 事件类型
   */
  hasEventListener(type) {
    return this.events != null
      && this.events.has(type)
      && this.events.get(type) != null
      && this.events.get(type).length > 0;
  }

  /**
   * 将事件分派到事件流中
   * @param {Event} event 要发出的事件
   */
  dispatchEvent(event) {
    if (this.hasEventListener(event.type)) {
      if (event.target === null) {
        event.target = this;
      }
      if (event.currentTarget === null) {
        event.currentTarget = this;
      }
      let arr = this.events.get(event.type);
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item.fun)
          item.fun(event);
      }
    }
  }

  /**
   * 移除事件监听
   * @param {string} type 事件类型
   * @param {function} fun 函数
   */
  removeEventListener(type, fun) {
    if (this.hasEventListener(type)) {
      let index = this._searchFunIndexWithType(fun, type);
      if (index >= 0)
        this.events.get(type).splice(index, 1);
    }
  }
}
export default EventDispatcher;