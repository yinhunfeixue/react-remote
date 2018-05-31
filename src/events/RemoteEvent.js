class RemoteEvent {

  /**
   * @enum {string} 发生变化 
   */
  static CHANGE = 'change';

  /**
   * @enum {string} 按下enter键
   */
  static ENTER = 'enter';

  /**
   * @enum {string} 获得焦点
   */
  static FOCUS = 'focus';

  /**
   * @enum {string} 失去焦点
   */
  static BLUR = 'blur';

  /**
   * @enum {string} 完成事件
   */
  static COMPLETE = 'complete';

  /**
   * 事件实例
   * @param {string} type 事件类型
   */
  constructor(type) {
    /**
     * 发出事件的对象
     */
    this.target = null;

    /**
     * 监听事件的对象
     */
    this.currentTarget = null;

    /**
     * 事件类型
     */
    this.type = type;
  }

  clone = () => {
    return new RemoteEvent(this.type);
  }
}
export default RemoteEvent;