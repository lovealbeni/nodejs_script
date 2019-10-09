import { drawInterface,initWebgl,attach } from './util';
import fshaderSource from '../app/sl/circleFshader.glsl';
import vshaderSource from '../app/sl/circleVshader.glsl';

function prepareCirclePointsAndcolors({x,y,r,n}){
    // x,y 圆心坐标
    // r 半径
    // n 三角形个数
    var pointsAndColors = [];
    // 首先放入第一个点
    pointsAndColors.push(x,y,0,255,0,1);
    var sin = Math.sin,cos = Math.cos,pi = 2*Math.PI;
    for(var i=0;i<=n;i++){
        pointsAndColors.push(x+r*cos(i*(pi/n)),y+r*sin(i*(pi/n)),255,0,0,1);
    }
    return pointsAndColors;
}

function circleMain(canvas:HTMLCanvasElement){
    var { gl,program } = initWebgl(canvas,vshaderSource,fshaderSource);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawCircleMain({
        gl:gl,
        program:program,
        canvas:canvas
    });
    attach(canvas);
}

function drawCircleMain(rederObj:drawInterface){
    var {gl,program,canvas} = rederObj;
    var positions = prepareCirclePointsAndcolors({
        x:400,
        y:200,
        r:100,
        n:50
    });
    var a_Position = gl.getAttribLocation(program,'a_Position');
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_Position);
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 6*4;
    var offset = 0;
    gl.vertexAttribPointer(a_Position,size,type,normalize,stride,offset);

    var a_Screen_size = gl.getAttribLocation(program,'a_Screen_size');
    gl.vertexAttrib2f(a_Screen_size,canvas.width,canvas.height);

    var a_Color = gl.getAttribLocation(program,'a_Color');
    var colorSize = 4;
    var colorOffset = 2*4;
    gl.enableVertexAttribArray(a_Color);
    gl.vertexAttribPointer(a_Color,colorSize,type,normalize,stride,colorOffset);
    var primitiveType = gl.TRIANGLE_FAN;
    var offset = 0;
    var count = positions.length/6;
    gl.drawArrays(primitiveType,offset,count);
}


export {
    circleMain
}