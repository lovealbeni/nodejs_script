import { drawInterface,initWebgl,attach } from './util';
import { identity,multiply,rotateX,rotateY,ortho } from './matrix';
import fshaderSource from '../app/sl/cubeFshader.glsl';
import vshaderSource from '../app/sl/cubeVshader.glsl';
import { Cube as cubeClass } from './geo/cubeClass';

function cubeMain(canvas:HTMLCanvasElement){
    var { gl,program } = initWebgl(canvas,vshaderSource,fshaderSource);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawCubeMultiMain({
        gl:gl,
        program:program,
        canvas:canvas
    });
    attach(canvas);
}

function drawCubeMultiMain(rederObj:drawInterface){
    let {gl,program,canvas} = rederObj;
    let cubes:cubeClass[] = [];
    cubes.push(new cubeClass(0,0,0));
    cubes.push(new cubeClass(1,1,0));
    cubes.push(new cubeClass(0,2,0));

    var a_Position = gl.getAttribLocation(program,'a_Position');
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    gl.enableVertexAttribArray(a_Position);
    var positionSize = 3;
    var positionType = gl.FLOAT;
    var positionNormalize = false;
    var positionStride = 3*4;
    var positionOffset = 0;
    // 这里要特殊注意一下，js的执行时根据当前的情况来默认绑定的，也就是说，执行vertexAttribPointer的时候，会把当前的
    // attribute和buffer绑定在一起，反例可以将下面代码复制到colorbuffer的vertex上方，就会发现不一样的情况
    gl.vertexAttribPointer(a_Position,positionSize,positionType,positionNormalize,positionStride,positionOffset);

    var a_Color = gl.getAttribLocation(program,'a_Color');
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    gl.enableVertexAttribArray(a_Color);
    var colorSize = 4;
    var colorType = gl.FLOAT;
    var colorNormalize = false;
    var colorStride = 4*4;
    var colorOffset = 0;
    gl.vertexAttribPointer(a_Color,colorSize,colorType,colorNormalize,colorStride,colorOffset);

    var indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indicesBuffer);

    var u_Matrix = gl.getUniformLocation(program,'u_Matrix');
    let aspect = canvas.width/canvas.height;
    var projectionMatrix = ortho(-aspect*4,aspect*4,-4,4,100,-100);
    var curMatrix = identity();
    curMatrix = multiply(projectionMatrix,curMatrix);

    gl.enable(gl.CULL_FACE);

    function drawRotateCube(){
        var xAngle = Math.random();
        var yAngle = Math.random();
        curMatrix = rotateX(curMatrix,deg2radians(xAngle));
        curMatrix = rotateY(curMatrix,deg2radians(yAngle));
        
        gl.uniformMatrix4fv(u_Matrix,false,curMatrix);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(let i = 0;i<cubes.length;i++){
            let nowCube = cubes[i];
            gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,nowCube.getPositions(),gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,nowCube.getColors(),gl.STATIC_DRAW);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,nowCube.getIndices(),gl.STATIC_DRAW);
            gl.drawElements(gl.TRIANGLES,nowCube.getIndices().length,gl.UNSIGNED_SHORT,0);
        }
        requestAnimationFrame(drawRotateCube);
    }
    drawRotateCube();
}

function deg2radians(angle){
    return (angle * Math.PI)/180;
}
export {
    cubeMain
}