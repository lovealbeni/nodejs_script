// 两个控制点x值
var global_p1 = 0.6;
var global_p2 = 0.53;

var global_p1y = 0.22;
var global_p2y = 2.05;

// var global_p1 = 0.04;
// var global_p2 = 0;

// var global_p1y = 0.38;
// var global_p2y = 0.99;

var cxt = null;
class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}

function createCanvas(){
	var canvas = document.createElement('canvas');
	canvas.width = 500;
	canvas.height = 500;
	document.querySelector('#demo').appendChild(canvas);
	return canvas;
}
function main(){
	var canvas = createCanvas();
	cxt = canvas.getContext('2d');
	// 绘制一个贝塞尔曲线
	// var pointArray = preparePoint();
	// drawPoint(pointArray,true);
	// --over--
	// 插值之巨无霸方法
	// var pointArray = preparePoint();
	// drawBall(pointArray);
	//  --over--
	// 预估方法
	// drawBall2();
	// --over--
}
var segement = 80;
var sampleStep = [];
function preparePreGuessT(){
	for (var i = 0; i <= segement; ++i) {
		sampleStep[i] = calcBezier(
		  i / segement,
		  global_p1,
		  global_p2
		);
	}
}
function preGuessT(x) {
	var t = 0;
	for (var i = 0; i < segement; i++) {
			var step = sampleStep[i];
			if (x < step) {
			var segStep = 1 / segement;
			var base = i * segStep; // 区间的下边界
			var aBit = segStep * (x - step) / (sampleStep[i+1] - sampleStep[i]); // 多出来的部分进行插值
			// 相当于在这一段当中，线性
			t = base + aBit; // 区间的下边界 ＋ 插值
		}
	}
	if(t==0){
		t = 1;
	}
	return t;
	// 求出t是多少以后，用calcBezier来算出y
}
var startTime2 = 0;
function drawBall2(){
	preparePreGuessT();
	startTime2 = new Date();
	loop2();
}
var stop2 = null;
function loop2(){
	var now = new Date();
	var percent = (now-startTime2)/cycle;
	if(percent>=1){
		percent = 1;
	}
	var t =preGuessT(percent);
	var posy = calcBezier(t,global_p1y,global_p2y);
	cxt.clearRect(0,0,500,500);
	drawCircle(0.5,posy);
	stop2 = requestAnimationFrame(loop2);
}
function showline(){
	var pointArray = preparePoint();
	drawPoint(pointArray,true);
}
function move(){
	var pointArray = preparePoint();
	drawBall(pointArray);
}
function drawPoint(pointArray,isCor=false){
	for(var i =0;i<pointArray.length;i++){
		drawCircle(pointArray[i].x,pointArray[i].y,isCor);
	}
}
function drawCircle(x,y,isCor=false){
	cxt.beginPath();
	if(isCor){
		y = 1.3-y;
		x = 0.5+x;
	}
	cxt.arc(x*300,y*300+20,10,0,2*Math.PI);
	cxt.fillStyle = 'pink';
	cxt.fill();
}
var startTime = 0;
var cycle = 5*1000;//周期
function drawBall(pointArray){
	startTime = new Date();
	loop(pointArray);
}
var handler = null;
function loop(pointArray){
	var now = new Date();
	var percent = ((now - startTime))/cycle;
	if(percent>=1){
		window.cancelAnimationFrame(handler);
		return;
	}
	percent = percent * pointArray.length;
	percent = Math.floor(percent);
	cxt.clearRect(0,0,500,500);
	drawCircle(0.5,pointArray[percent].y);
	handler = requestAnimationFrame(function(){
		loop(pointArray);
	});
}
function preparePoint(){
	var segement = 500;//分段的数量
	var sampleStep = [];
	for (var i = 0; i <= segement; ++i) {
		sampleStep[i] = {};
		sampleStep[i].x = calcBezier(
			i / segement,
			global_p1,
			global_p2
		);
		sampleStep[i].y = calcBezier(
			i / segement,
			global_p1y,
			global_p2y
		);
	}
	return sampleStep;
}

// t^3 的系数
function A(P1, P2) {
	return 1.0 - 3.0 * P2 + 3.0 * P1;
}
  
// t^2 的系数
function B(P1, P2) {
	return 3.0 * P2 - 6.0 * P1;
}

// t 的系数
function C(P1) {
	return 3.0 * P1;
}

// 公式 B(t) = (1-3*P2+3*P1) * t^3 + (3*P2 - 6*P2) * t^2 + (3*P1) * t 的函数形式
function calcBezier(t, P1, P2) {
	return ((A(P1, P2) * t + B(P1, P2)) * t + C(P1)) * t;
}
  
// 公式 B(t) = (1-3*P2+3*P1) * t^3 + (3*P2 - 6*P2) * t^2 + (3*P1) * t 的导数
function getSlope(t, P1, P2) {
	return 3.0 * A(P1, P2) * t * t + 2.0 * B(P1, P2) * t + C(P1);
}

window.onload = main;
