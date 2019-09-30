import shader from './vshader';
import Matrix from './cuon-matrix';
import vshaderSource from './vshader.glsl';
import fshaderSource from './fshader.glsl';
import { initWebgl } from '../demo/util';
function main(){
    var canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = canvas.width * 0.6;

    var {gl,program} = initWebgl(canvas,vshaderSource,fshaderSource)



    // 开始画,position 包括x,y&color
    var positions = [
        30,30,255,0,0,1,
        30,300,0,255,0,1,
        300,300,0,0,255,1,
        300,30,128,128,128,1
    ];
    // positions = prepareCirclePointsAndcolors({
    //     x:400,
    //     y:200,
    //     r:100,
    //     n:50
    // });
    positions = prepareTexturePositions();
    var indices = [
        0,1,2,
        0,2,3
    ]
    var a_Position = gl.getAttribLocation(program,'a_Position');
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_Position);
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 6*4; //一个顶点的数据量（2个坐标，4个颜色）
    var textureStride = 4*4; // 纹理坐标的数据量（2个坐标，2个纹理坐标）
    var offset = 0;
    var textureOffset = 2*4; //有两个坐标
    //  顶点属性指针
    gl.vertexAttribPointer(a_Position,size,type,normalize,textureStride,offset);

    // 纹理坐标传入
    var a_Uv = gl.getAttribLocation(program,'a_Uv');
    gl.enableVertexAttribArray(a_Uv);
    gl.vertexAttribPointer(a_Uv,size,type,normalize,textureStride,textureOffset);
    // 初始化纹理
    var uniformTexture = gl.getUniformLocation(program,'texture');
    prepareTextureImg('./app/timg.jpg').then(img=>{
        gl.activeTexture(gl.TEXTURE0);
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
        gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
        gl.uniform1i(uniformTexture,0);

        var primitiveType = gl.TRIANGLE_FAN;
        var offset = 0;
        var count = 4;
        count = positions.length/4;//和stride的值相等，生成的数组里面有6个坐标形成一个点，所以要/6
        gl.drawArrays(primitiveType,offset,count);
    });
    // 顶点buffer
    var indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);

    // 获取屏幕尺寸
    var a_Screen_size = gl.getAttribLocation(program,'a_Screen_size');
    gl.vertexAttrib2f(a_Screen_size,canvas.width,canvas.height);
    // 传颜色
    // var a_Color = gl.getAttribLocation(program,'a_Color');

    // 把color 和 position 放在一个buffer里面
    // var colors = [
    //     234,123,124,1,
    //     145,156,167,1,
    //     187,186,166,1,
    //     234,123,124,1,
    //     145,156,167,1,
    //     187,186,166,1
    // ]
    // var colorBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.STATIC_DRAW);
    
    // gl.enableVertexAttribArray(a_Color);
    // var colorSize = 4;
    // var colorOffset = 2*4;//color的偏移量= position's size
    // gl.vertexAttribPointer(a_Color,colorSize,type,normalize,stride,colorOffset);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // var primitiveType = gl.TRIANGLE_FAN;
    // var offset = 0;
    // var count = 4;
    // count = positions.length/6;//和stride的值相等，生成的数组里面有6个坐标形成一个点，所以要/6
    // gl.drawArrays(primitiveType,offset,count);
    // gl.drawElements(primitiveType,count,gl.UNSIGNED_SHORT,offset)


    // drawAnotherCircle(gl);

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
function attach(dom:HTMLElement){
    var body = document.querySelector('body');
    body.appendChild(dom);
}
window.onload = main;

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

function prepareTexturePositions(){
    var positions = [
        30,30,0,0,
        30,300,0,1,
        300,300,1,1,
        30,30,0,0,
        300,300,1,1,
        300,30,1,0
    ];
    return positions;
}

function prepareTextureImg(url:String){
    // 准备纹理贴图的
    return new Promise<HTMLImageElement>((resove,reject)=>{
        var img = new Image();
        img.onload = function(){
            resove(img);
        };
        img.src = url.toString();
    });
}