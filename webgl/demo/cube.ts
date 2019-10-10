import { drawInterface,initWebgl,attach } from './util';
import fshaderSource from '../app/sl/cubeFshader.glsl';
import vshaderSource from '../app/sl/cubeVshader.glsl';

function cubeMain(canvas:HTMLCanvasElement){
    var { gl,program } = initWebgl(canvas,vshaderSource,fshaderSource);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawCubeMain({
        gl:gl,
        program:program,
        canvas:canvas
    });
    attach(canvas);
}


function drawCubeMain(rederObj:drawInterface){
    
}

export {
    cubeMain
}