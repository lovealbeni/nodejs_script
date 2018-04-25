const path = require('path');
const file = process.argv[2];
const fs = require('fs');

//lalalal
function getFileExt(file) {
	return path.extname(file);
}

function main(){
	if(!file){
		throw new Error('没有指定wxss文件');
	}
	if(getFileExt(file).slice(1).toLowerCase() !== 'wxss'){
		throw new Error('指定的文件格式不正确');
	}
	let wxssFile = path.resolve(process.cwd(),file);
	let filestream = fs.readFileSync(wxssFile).toString();
	let reg = /([0-9]+)[.]([0-9]?)rem/g;
	console.log(filestream.replace(reg, function(m,p1,p2){
		let tempNumber = p1+'.'+p2;
		tempNumber = parseFloat(tempNumber)*100;
		return tempNumber+'rpx';
	}));
}

main();
