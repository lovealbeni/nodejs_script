var globalNameSpace = {
	width:100,
	height:100,
	text:'I love you',
	linehight:7
}
function main(){
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.setAttribute('width',globalNameSpace.width);
	canvas.setAttribute('height',globalNameSpace.height);
	context.fillStyle = '#000';
	context.font = 'bold 10px Arial';
	var measure = context.measureText(globalNameSpace.text);
	var fSize = Math.min(globalNameSpace.height*8/globalNameSpace.linehight,globalNameSpace.width*8/measure.width);
	context.font = `bold ${fSize}px Arial`;
	measure = context.measureText(globalNameSpace.text);
	var left = (globalNameSpace.width - measure.width)/2;
	var bottom = (globalNameSpace.height + fSize/10*globalNameSpace.linehight)/2;
	context.fillText(globalNameSpace.text,left,bottom);
	var imgData = context.getImageData(0,0,globalNameSpace.width,globalNameSpace.height);
	var points = [];
	for(var i =0,max=imgData.width*imgData.height;i<max;i++){
		if(imgData.data[i*4+3]){
			points.push({
				x:(i/globalNameSpace.width)|0,
				y:i%globalNameSpace.height
			});
		}
	}
	console.log({points});
	draw(canvas);
}
function draw(canvas){
	document.querySelector('body').appendChild(canvas);
}
window.onload = main;