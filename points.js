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
	serialize(){
		let sum = this.x*this.x+this.y*this.y;
		sum = Math.sqrt(sum);
		this.x = this.x/sum;
		this.y = this.y/sum;
		return this;
	}
	long(value){
		this.x = value*this.x;
		this.y = value*this.y;
		return this;
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
var defineSpeed = 10;
class Ball{
	constructor(v){
		this.speed = new Vec(defineSpeed*Math.cos(v).toFixed(6),defineSpeed*Math.sin(v).toFixed(6));
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
		return this.x>width||this.x<0||this.y>height||this.y<0;
	}
	isHit(){
		let dx = Math.abs(Math.ceil(this.x)-static_POS.x);
		let dy = Math.abs(Math.ceil(this.y)-static_POS.y);
		let distance = Math.pow(dx,2) + Math.pow(dy,2);
		return distance<=(Math.pow(65,2));
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
	start_judge = static_POS.y - 60;
	DrawCenterCircle(cxt,static_POS,60);
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
	DrawCenterCircle(cxt,static_POS,60);
	P_ball.draw(cxt);
	P_ball.move();
	if(P_ball.isOut()){
		P_ball = null;
		clear();
		DrawCenterCircle(cxt,static_POS,60);
		return;
	}
	if(P_ball.y >= start_judge){
		let result = P_ball.isHit();
		if(result&&!P_ball.boom){
			// 已经碰撞
			Boom();
			// return;
		}
	}
	requestAnimationFrame(()=>{
		loop();
	});
}
function Boom(){
	let vecIn = new Vec(static_POS.x-P_ball.x,static_POS.y-P_ball.y).serialize();
	let vecOut = new Vec(P_ball.x-static_POS.x,P_ball.y-static_POS.y).serialize();
	P_ball.speed.serialize();
	let In = vecIn.mutiply(P_ball.speed);
	let InRadion = Math.acos(In)*180/Math.PI;
	let Nv = rotate((P_ball.speed.x/Math.abs(P_ball.speed.x))*InRadion).mutiply(vecOut).long(defineSpeed);
	P_ball.speed = Nv;
	P_ball.boom = true;
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