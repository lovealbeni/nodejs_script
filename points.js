class Vec{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	print(){
		console.log(this.x,this.y);
	}
	setX(x){
		this.x = x;
	}
	setY(y){
		this.y = y;
	}
	mutiply(vec){
		return vec.x*this.x + vec.y*this.y;
	}
}
class Mat{
	constructor(array){
		this.array = array;
	}
	// eq:array = [[1,2],[3,4]]
	// like \1,2\
	//      \3,4\
	mutiply(vec){
		let tempVec = {x:'',y:''};
		tempVec.x = this.array[0][0]*vec.x + this.array[0][1]*vec.y;
		tempVec.y = this.array[1][0]*vec.x + this.array[1][1]*vec.y;
		let newV = new Vec('','');
		newV.setX(tempVec.x);
		newV.setY(tempVec.y);
		return newV;
	}
	// 二阶
}
class Ball{
	constructor(v){
		this.speed = new Vec(10*Math.cos(v).toFixed(6),10*Math.sin(v).toFixed(6));
		this.x = width/2;
		this.y = 0;
	}
	draw(cxt){
		DrawCircle(cxt,{x:this.x,y:this.y},5,'red',true);
	}
	move(){
		this.x += this.speed.x;
		this.y += this.speed.y;
	}
	isOut(){
		let a = this.x>width/2;
		return this.x>width||this.x<0||this.y>height;
	}
	isHit(){
		let dx = Math.ceil(this.x-static_POS.x);
		let dy = Math.ceil(this.y-static_POS.y);
		let distance = Math.pow(dx,2) + Math.pow(dy,2);
		return distance<=(Math.pow(45,2));
	}
}
var P_ball = null;//小球的指针
function rotate(angle){
	let matEntity = new Mat([[ Math.cos(angle*Math.PI/180).toFixed(6),-Math.sin(angle*Math.PI/180).toFixed(6)],[Math.sin(angle*Math.PI/180).toFixed(6),Math.cos(angle*Math.PI/180).toFixed(6)]]);
	return matEntity;
}
// let v = rotate(90).mutiply(new Vec(1,1)).print();
var width = 0,height=0;
var cxt = null;
var static_POS = {};
var start_judge = 0;//碰撞检测的位置（减少判断次数）
function main(){
	var canvas = createCanvas();
	canvas.addEventListener('click',ClickHander)
	width = canvas.width;
	height = canvas.height;
	cxt = canvas.getContext('2d');
	clear(canvas.width,canvas.height);
	static_POS = {
		x:canvas.width/2,
		y:3*canvas.height/4
	};
	start_judge = static_POS.y - 40;
	DrawCenterCircle(cxt,static_POS,40);
}
function clear(x,y){
	if(!x){
		x = clear.x;
		y = clear.y;
	}else{
		clear.x = x;
		clear.y = y;
	}
	cxt.clearRect(0,0,x,y);
}
function ClickHander(event){
	if(P_ball){
		console.log('have');
		return;
	}
	let v = getRadio(event.offsetX,event.offsetY);
	P_ball = new Ball(v);
	loop();
}
function loop(){
	clear();
	DrawCenterCircle(cxt,static_POS,40);
	P_ball.draw(cxt);
	P_ball.move();
	if(P_ball.isOut()){
		P_ball = null;
		clear();
		DrawCenterCircle(cxt,static_POS,40);
		return;
	}
	if(P_ball.y >= start_judge){
		let result = P_ball.isHit();
		if(result){
			// 已经碰撞
			Boom();
		}
	}
	requestAnimationFrame(()=>{
		loop();
	});
}
function Boom(){
	let vecC = new Vec(P_ball.x,P_ball.y);
	let length = P_ball.x*P_ball.x + P_ball.y+P_ball.y;
	length = Math.sqrt(length);
	let tha = vecC.mutiply(P_ball.speed);
	tha = tha/(length+10);// cos
	tha = (Math.acos(tha)*180/Math.PI).toFixed(6);
	let NV = rotate(50).mutiply(P_ball.speed);
	P_ball.speed = NV;
	// let v = rotate(90).mutiply(new Vec(1,1)).print();
}
function getRadio(x,y){
	var dx = x-width/2;
	var dy = y;
	var result = Math.atan2(dy,dx);
	return result;
}
function DrawCenterCircle(cxt,center,size){
	DrawCircle(cxt,center,size,'pink',true);
}
function DrawCircle(cxt,center,size,color,isSolid){
	cxt.beginPath();
	cxt.arc(center.x,center.y,size,0,2*Math.PI);
	if(isSolid){
		cxt.fillStyle = color;
		cxt.fill()
	}else{
		cxt.stroke();
	}
}
function createCanvas(){
	var canvas = document.createElement('canvas');
	canvas.width = 500;
	canvas.height = 500;
	document.querySelector('#demo').appendChild(canvas);
	return canvas;
}
window.onload = main;