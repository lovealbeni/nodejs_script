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
    attach(canvas)
}

function drawShaderMain(renderObj:drawInterface){
    var { gl,program,canvas } = renderObj
    var a_Position = gl.getAttribLocation(program,'a_Position')
    var u_Screen = gl.getUniformLocation(program,'u_Screen')
    gl.vertexAttrib1f(a_Position,0.0)
    gl.uniform2f(u_Screen,canvas.width,canvas.height)
    gl.drawArrays(gl.POINTS,0,1)
}

export {
    shaderMain
}