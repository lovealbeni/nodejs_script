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
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS,0,1);

    attach(canvas);
}
function attach(dom){
    var body = document.querySelector('body');
    body.appendChild(dom);
}
window.onload = main;