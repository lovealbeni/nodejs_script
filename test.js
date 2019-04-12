var origin = [1, 2, 3, 4, 5];
var now = [6, 8, 9, 1, 2];
var result = origin;
var nowLast = now[now.length - 1];
var originFirst = origin[0];
var index = 0;

var indexInOrigin = origin.indexOf(nowLast);

if (indexInOrigin < 0) {
	result = setResult(result, []);
	result = setResult(result, now);
} else {
    var indexInNow = now.indexOf(originFirst);
    if(indexInNow==0){
        result = setResult(origin,now);
    }else{
        var temp = origin.slice(0,indexInNow-1);
        result = setResult(origin,temp);
        temp = now.concat(result);
        result = setResult(result,temp);
    }
}

function setResult(source, target) {
    console.log(index);
    index ++;
	console.log(source);
	console.log(target);
	return target;
}
