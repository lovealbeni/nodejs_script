import shader from './vshader';
function main(){
    var VSHADER_SOURCE = shader.VSHADER_SOURCE;
    var FSHADER_SOURCE = shader.FSHADER_SOURCE;
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth*0.8;
    canvas.height = window.innerHeight*0.8;
    var gl = canvas.getContext('webgl');
    
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader,VSHADER_SOURCE);
    gl.compileShader(vshader);

    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader,FSHADER_SOURCE);
    gl.compileShader(fshader);

    var programe = gl.createProgram();
    gl.attachShader(programe,vshader);
    gl.attachShader(programe,fshader);
    gl.linkProgram(programe);
    gl.useProgram(programe);
    
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