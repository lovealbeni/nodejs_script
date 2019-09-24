import shader from './vshader';
import Matrix from './cuon-matrix';
import vshaderSource from './vshader.glsl';
import fshaderSource from './fshader.glsl';
function main(){
    var canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = canvas.width * 0.6;
    var gl = canvas.getContext('webgl');

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vshaderSource);
    gl.compileShader(vertexShader);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fshaderSource);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);



    // 开始画,position 包括x,y&color
    var positions = [
        30,30,234,123,124,1,
        30,300,145,156,167,1,
        300,300,187,186,166,1,
        300,30,187,186,166,1
    ];
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
    var offset = 0;
    //  顶点属性指针
    gl.vertexAttribPointer(a_Position,size,type,normalize,stride,offset);

    // 顶点buffer
    var indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);

    // 获取屏幕尺寸
    var a_Screen_size = gl.getAttribLocation(program,'a_Screen_size');
    gl.vertexAttrib2f(a_Screen_size,canvas.width,canvas.height);
    // 传颜色
    var a_Color = gl.getAttribLocation(program,'a_Color');
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
    gl.enableVertexAttribArray(a_Color);
    var colorSize = 4;
    var colorOffset = 2*4;//color的偏移量= position's size
    gl.vertexAttribPointer(a_Color,colorSize,type,normalize,stride,colorOffset);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var primitiveType = gl.TRIANGLE_FAN;
    var offset = 0;
    var count = 6;
    // gl.drawArrays(primitiveType,offset,count);
    gl.drawElements(primitiveType,count,gl.UNSIGNED_SHORT,offset)

    attach(canvas);
}
function attach(dom){
    var body = document.querySelector('body');
    body.appendChild(dom);
}
window.onload = main;