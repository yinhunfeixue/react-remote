/**
 * 数值辅助类
 * 
 * @author : xujunjie 
 * @mail   : yinhunfeixue@163.com
 * @date   : 2017/9/7 下午7:26:03
 */
class NumberUtil {
	/**
	 * 把数字限制在指定范围内
	 * @param {number} value 值
	 * @param {number} minValue 最小值
	 * @param {number} maxValue 最大值
	 */
	static limit(value, minValue, maxValue) {
		if (value < minValue) {
			value = minValue;
		}

		if (value > maxValue) {
			value = maxValue;
		}
		return value;
	}

	/**
	 * 数字转换为中文表示，例如123转换为一百二十三
	 * 因为中文数字单位限制，最大支持72位数字
	 * 
	 * <b>注意：当数字过大时，number.toString()会有.，因此，如果转换大数，请传入字符串参数，例如: '11111111111111111111111111111111111111111111111111'</b>
	 * @param {*} number 
	 * 
	 * @example
	 * NumberUtil.toChineseWord('1111234567890123456789123456789012345');
	 */
	static toChineseWord(number) {
		const FORMAT_A = ['千', '百', '十', ''];		//小单位，一个小循环
		const FORMAT_B = ['无量大海', '不可思议', '那由他', '阿僧只', '恒河沙', '极', '载', '正', '涧', '沟', '穰', '秭', '垓', '京', '兆', '亿', '万', ''];	//大单位
		const NUMBER_WORD = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

		if (!number) {
			return NUMBER_WORD[0];
		}
		//先拆成数组
		let arr = number.toString().split('');
		let result = '';
		const LA = FORMAT_A.length;
		const LB = FORMAT_B.length;
		for (let i = 0; i < arr.length; i++) {
			let index = arr.length - 1 - i;
			let indexA = LA - 1 - index % LA;
			let indexB = LB - 1 - Math.floor(index / LA);

			//如果不是0,加上数字和小单位
			if (arr[i] !== '0') {
				result += NUMBER_WORD[arr[i]] + FORMAT_A[indexA];
			}
			//如果是0，但不是小循环的最后一位，则加上0对应的汉字
			else if (indexA !== LA - 1) {
				result += NUMBER_WORD[arr[i]];
			}

			//如果是小循环的最后一位，则加上大单位
			if (indexA === LA - 1) {
				result += FORMAT_B[indexB];
			}
		}
		return result;
	}
}

export default NumberUtil;