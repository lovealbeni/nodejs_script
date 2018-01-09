const xlsx = require('node-xlsx');
const path = require('path');
const file = process.argv[2];
const moment = require('moment');
//test for atom

// 获取文件后缀名
function getFileExt(file) {
	return path.extname(file);
}

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
	let now;
	for(let i of data){
		if(i.length == 1){
			now = i[0];
			output_data[now] = [];
		}
		else{
			output_data[now].push(i[1])
		}
	}
	console.log(output_data);
	return;
}

main(); // 入口函数
