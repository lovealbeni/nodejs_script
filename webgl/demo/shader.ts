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
    var u_Time = gl.getUniformLocation(program,'u_Time')
    gl.vertexAttrib1f(a_Position,0.0)
    gl.uniform2f(u_Screen,canvas.width,canvas.height)
    let time = 1.0
    const drawLoop = () => {
        gl.uniform1f(u_Time,time)
        gl.drawArrays(gl.POINTS,0,1)
        time += 0.01
        time = time % 10
        requestAnimationFrame(drawLoop)
    }
    requestAnimationFrame(drawLoop)
}

export {
    shaderMain
}