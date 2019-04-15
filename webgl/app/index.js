import shader from './vshader';
import Matrix from './cuon-matrix';
function main(){
    var matrix = new Matrix.Matrix4();
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
    
    var a_Position = gl.getAttribLocation(programe,'a_Position');
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var vertices = new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5
    ]);
    var point_n = 3;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    // var xformMatrix = new Float32Array([
    //     1.0,0.0,0.0,0.3,
    //     0.0,1.0,0.0,0.0,
    //     0.0,0.0,1.0,0.0,
    //     0.0,0.0,0.0,1.0
    // ])
    matrix.setRotate(20,1,1,1);
    // matrix.transpose();
    var u_xformMatrix = gl.getUniformLocation(programe,'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix,false,matrix.elements);

    gl.drawArrays(gl.TRIANGLES,0,point_n);
    attach(canvas);
}
function attach(dom){
    var body = document.querySelector('body');
    body.appendChild(dom);
}
window.onload = main;