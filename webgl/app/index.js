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



    // 开始画
    var positions = [300,20,20,300,300,300];
    var a_Position = gl.getAttribLocation(program,'a_Position');
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_Position);
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(a_Position,size,type,normalize,stride,offset);

    // 获取屏幕尺寸
    var a_Screen_size = gl.getAttribLocation(program,'a_Screen_size');
    gl.vertexAttrib2f(a_Screen_size,canvas.width,canvas.height);
    // 传颜色
    var u_Color = gl.getUniformLocation(program,'u_Color');
    gl.uniform4f(u_Color,255,249,123,1);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType,offset,count);

    attach(canvas);
}
function attach(dom){
    var body = document.querySelector('body');
    body.appendChild(dom);
}
window.onload = main;