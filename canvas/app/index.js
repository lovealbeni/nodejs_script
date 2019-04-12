import { fabric } from 'fabric';
function main(){
	let width = document.body.clientWidth;
	let height = document.body.clientHeight;
	let canvas = new fabric.Canvas('c');
	canvas.setHeight(height*0.95);
	canvas.setWidth(width);
	let rect = new fabric.Rect({
		left:100,
		top:50,
		fill:'#d81b60',
		width:100,
		height:100,
		strokeWidth:2,
		stroke: '#000000',
		rx:10,
		ry:10,
		angle:45,
		// hasControls:false,
		// lockMovementX:true,
		// lockMovementY:true,
		hoverCursor:null
	});
	canvas.add(rect);
}
window.onload = main;