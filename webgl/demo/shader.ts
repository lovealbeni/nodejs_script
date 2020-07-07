import { drawInterface, initWebgl, attach } from './util'
import fshaderSource from '../app/sl/shaderFshader.glsl';
import vshaderSource from '../app/sl/shaderVshader.glsl';

function shaderMain(canvas:HTMLCanvasElement){
    var { gl, program } = initWebgl(canvas,vshaderSource,fshaderSource)
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    drawShaderMain({
        gl:gl,
        program:program,
        canvas:canvas
    })
    canvas.style.backgroundColor = 'black'
    attach(canvas)
}

function drawShaderMain(renderObj:drawInterface){
    var { gl,program,canvas } = renderObj
    var verticesTexCoords = new Float32Array([
        -1.0, 1.0, 0.0, 1.0,
        -1.0, -1.0, 0.0, 0.0,
        1.0, 1.0, 1.0, 1.0,
        1.0, -1.0, 1.0, 0.0,
    ]);
    var n = 4;
    var vertexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
    
    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    
    var a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position);
    
    var a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord)

    var u_Time = gl.getUniformLocation(program,'time')
    var newTime = 0.1
    var draw = function(){
        gl.clear(gl.COLOR_BUFFER_BIT);
        newTime += 0.05
        gl.uniform1f(u_Time,newTime);
        gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
        requestAnimationFrame(draw)
    }
    draw()
}

export {
    shaderMain
}