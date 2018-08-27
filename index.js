//TODO:remove it
/// <reference path="/usr/local/lib/node_modules/@types/jquery/index.d.ts"/>
/// <reference path="/usr/local/lib/node_modules/@types/three/index.d.ts"/>
const xlsx = require('node-xlsx');
const path = require('path');
const file = process.argv[2];
const moment = require('moment');
// 获取文件后缀名
function getFileExt(file) {
	return path.extname(file);
}
//test
function main() {
	let output_data = {};
	if (!file) {
		throw new Error('没有指定xlsx文件');
	}

	if (getFileExt(file).slice(1).toLowerCase() !== 'xlsx') {
		throw new Error('指定文件格式不正确');
	}

	let xlsxFile = path.resolve(process.cwd(), file);
	let data = xlsx.parse(xlsxFile)[0].data;
	let result = {};
	let origin_date = data[1][6];
	let index = 0;
	for(let i=1,j=data.length;i<j;i++){
		let target = data[i];//target is an array
		// console.log(data[i]);
		// if(target[6] != origin_date){
		// 	index++;
		// 	origin_date = target[6];
		// }
		if(!result[index]){
			result[index] = [{
				'goods_id':target[0],
				'goods_name':target[1],
				'dingjin':target[2],
				'daoshoujia':target[3],
				'richang':target[4],
				// 'date':target[6]
			}];
		}else{
			result[index].push({
				'goods_id':target[0],
				'goods_name':target[1],
				'dingjin':target[2],
				'daoshoujia':target[3],
				'richang':target[4],
				// 'date':target[6]
			})
		}
	}
	console.log(JSON.stringify(result));
	return;
}


main(); // 入口函数
