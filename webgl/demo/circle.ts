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
    drawAnotherCircle(gl);
    attach(canvas);
}

function drawAnotherCircle(gl:WebGLRenderingContext){
    // 这个方法是用来画另外一个圆用的，形成的和上面画圆的代码一样的圆，画出了另外一个
    // 这个地方和教程里面提到的动态绘制三角的地方很像，不同的是在动态绘制三角的时候，之所以要把上一次绘制的
    // 点保留下来，是因为在之前设置了clear画布，所以每一次要绘制所有的点，而这里没有清空数据，只是把所有的数据都存了起来，所以不需要保存之前的点
    // 依然可以在之前的基础上，直接画出这一次的点
    var primitiveType = gl.TRIANGLE_FAN;
    var offset = 0;
    var count = 4;
    var positions = prepareCirclePointsAndcolors({
        x: 600,
        y: 200,
        r: 100,
        n: 100
    });
    count = positions.length/6;
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
    gl.drawArrays(primitiveType,offset,count);
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