/**
 * 
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/4 下午1:55:14
 */

class ObjectUtil {

	/**
	 * 从data中取出target不存在，或者存在但是值不同的属性
	 * @param {object} target 
	 * @param {object} data 
	 * 
	 * @return {object} data存在，target不存在或者存在但是值不同的属性键值对
	 */
	static filterDifferentValue(target, data) {
		let result = {};
		for (let key in data) {
			if (!(key in target) || target[key] !== data[key]) {
				result[key] = data[key];
			}
		}
		return result;
	}

	/**  
	 * 把data的属性填充到target中
	 * @param {Object} target 被填充的对象
	 * @param {Object} data 获取数据的数据源
	 * @param {boolean} isAdd 如果target不存在同名属性，是否添加
	 * @param {boolean} ignoreCase 是否忽略大小写
	 * 
	 * @return {object} 成功写入target的属性键值对
	 */
	static Fill(target, data, isAdd = false, ignoreCase = false) {
		let result = {};
		if (target === null || data === null) {
			return result;
		}
		for (let key in data) {
			let useKey = ignoreCase ? key.toLowerCase() : key;
			if (isAdd || (useKey in target)) {
				try {
					target[key] = data[key];
					result[key] = data[key];
				} catch (error) {

				}
			}
		}
		return result;
	}

	/**
	 * 合多个对象，把多个对象的属性合并到一个对象中，如果有重复属性，前面的对象属性将被后面的对象覆盖
	 * @param {Array} objs 对象集合
	 */
	static Merge(...objs) {
		let result = {};
		if (!objs || objs.length === 0) {
			return result;
		}
		for (let i = 0; i < objs.length; i++) {
			for (let key in objs[i]) {
				const attribute = objs[i][key];
				result[key] = ObjectUtil.clone(attribute);
			}
		}
		return result;
	}

	/**
	 * 判断两个变量是否相同。都为null/undefined/NaN视为相同
	 * @param {*} a 
	 * @param {*} b 
	 */
	static isEqual(a, b) {
		//先判断是否指向同一个实例
		if (a === b) {
			return true;
		}
		else if ((a === null && b === null)
			|| (typeof (a) === 'number' && typeof (b) === 'number' && isNaN(a) && isNaN(b))
			|| (typeof (a) === 'undefined' && typeof (b) === 'undefined')) {
			return true;
		}
		else if (a instanceof Function && b instanceof Function) {
			return a === b;
		}
		//如果是数组
		else if (a instanceof Array && b instanceof Array) {
			//先判断长度
			if (a.length !== b.length) {
				return false;
			}
			//长度相同，则比较每一项，任意一项不同，就返回false
			let len = a.length;
			for (let i = 0; i < len; i++) {
				let result = ObjectUtil.isEqual(a[i], b[i]);
				if (!result) {
					return false;
				}
			}
			return true;
		}

		//如果是object，则循环比较每一个属性
		else if (a instanceof Object && b instanceof Object) {
			let propsA = Object.getOwnPropertyNames(a);
			let propsB = Object.getOwnPropertyNames(b);
			//如果属性数量不同，返回false
			if (propsA.length !== propsB.length) {
				return false;
			}

			//循环属性，任意一个属性值不同，返回false
			for (let key in a) {
				if (!ObjectUtil.isEqual(a[key], b[key])) {
					return false;
				}
			}
			return true;
		}
		else {
			return a === b;
		}
	}

	/**
	 * 浅拷贝，基本类型会拷贝值，对象只拷贝引用
	 * @param {*} data 
	 */
	static clone(data) {
		//如果数据为null,或者是函数，或者不是Object对象，则返回自身
		if (data == null || data instanceof Function || !(data instanceof Object)) {
			return data;
		}
		//如果是date或者正则，使用属性直接创建新的对象
		else if (data instanceof Date) {
			return new Date(data.getTime());
		}
		else if (data instanceof RegExp) {
			return ObjectUtil._cloneReg(data);
		}
		else {
			let result;
			//优先创建和被复制对象一样的数据，如果失败，则使用object
			try {
				result = new (data.constructor)();
			}
			catch (error) {
				result = {};
			}
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					result[key] = data[key];
				}
			}
			return result;
		}
	}

	/**
	 * 深拷贝，除函数会使用引用外，其它对象都会深拷贝
	 * 支持循环引用的对象拷贝
	 * @param {*} data 
	 */
	static deepClone(data) {
		return ObjectUtil._clone(data, new Map());
	}

	/**
	 * 
	 * @param {*} data 
	 * @param {*} cache 
	 * 
	 * @private
	 */
	static _clone(data, cache) {
		if (!cache || !(cache instanceof Map)) {
			throw new RangeError('cache 必须是Map');
		}
		//如果数据为null,或者是函数，或者不是Object对象，则返回自身
		if (data == null || data instanceof Function || !(data instanceof Object)) {
			return data;
		}
		//如果是date或者正则，使用属性直接创建新的对象
		else if (data instanceof Date) {
			return new Date(data.getTime());
		}
		else if (data instanceof RegExp) {
			return ObjectUtil._cloneReg(data);
		}
		//如果缓存中有，返回缓存中的对象
		else if (cache && cache.has(data)) {
			return cache.get(data);
		}
		else {
			//创建对象，并放入缓存，防止循环引用时，重复创建
			let result;

			//优先创建和被复制对象一样的数据，如果失败，则使用object
			try {
				result = new (data.constructor)();
			}
			catch (error) {
				result = {};
			}

			cache.set(data, result);
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					result[key] = ObjectUtil._clone(data[key], cache);
				}
			}
			return result;
		}
	}

	static _cloneReg(reg) {
		let flags = '';
		flags += reg.global ? 'g' : '';
		flags += reg.ignoreCase ? 'i' : '';
		flags += reg.multiline ? 'm' : '';
		return new RegExp(reg.source, flags);
	}
}

export default ObjectUtil;