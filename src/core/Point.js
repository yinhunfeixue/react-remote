/**
 * 
 * 表示一个二维坐标的点,也可以表示一个向量
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/9 下午4:48:20
 */
class Point {

	/**
	 * 实例化二维坐标点
	 * @param {number} x x坐标
	 * @param {number} y y坐标
	 */
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * 将另一个点的坐标添加到此点的坐标，此方法会修改当前point实例
	 * @param {number} x 要增加的x坐标
	 * @param {number} y 要增加的y坐标
	 * @return 当前Point实例
	 */
	add(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}

	/**
	 * 将另一个点的坐标添加到此点的坐标
	 * @param {Point} point 要添加的点
	 * @return 当前Point实例
	 */
	addPoint(point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	}

	/**
	 * 从此点的坐标中减去另一个点的坐标
	 * @param {number} x 要减去的x坐标
	 * @param {number} y 要减去的y坐标
	 * @return 当前Point实例
	 */
	sub(x, y) {
		this.x -= x;
		this.y -= y;
		return this;
	}

	/**
	 * 从此点的坐标中减去另一个点的坐标
	 * @param {Point} point 要减去的点
	 * @return 当前Point实例
	 */
	subPoint(point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	}

	/**
	 * 复制一个新的Point实例
	 */
	clone() {
		return new Point(this.x, this.y);
	}
}

export default Point;