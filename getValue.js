function getValue({ obj, attrs, defalut = 0 } = {}) {
	if (!obj) {
		return defalut;
	}
	if (typeof attrs != 'string') {
		throw new Error('attrs must be string');
	}
	// 'a[0].b.c'
	attrs = attrs.split('.');
	for (let i = 0; i < attrs.length; i++) {
		let tempKey = attrs[i];
		tempKey = getArrayKey(tempKey);
		if(isNullORUndefine(obj[tempKey.value]) && i != attrs.length-1){
			return defalut;
		}
		if(!tempKey.key){
			// 不是数组下标的形式
			obj = obj[tempKey.value];
		}else{
			// 是数组形式
			obj = obj[tempKey.value][tempKey.key];
		}
	}
	return obj;
}
function getArrayKey(value){
	// 判断是否是数组的下标
	var reg = /(.*)\[(\d*)\]/g;
	let result = reg.exec(value);
	if(!result){
		return {value:value,key:false};
	}else{
		return {value:result[1],key:result[2]};
	}
}
function isNullORUndefine(value){
	return (value === 'undefined' || Object.prototype.toString.call(value) == '[object Null]');
}

var obj = {
    a:[{bar:1},2,3],
    b: 'foo',
    c:undefined
}
var result = getValue({
    obj:obj,
    attrs:'a[0].bar',
    defalut:0
});
console.log(result);