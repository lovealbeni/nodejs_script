import { drawInterface,initWebgl,attach,BufferBind,LocationFuncType } from './util';
import { identity,multiply,rotateX,rotateY,ortho,inverse } from './matrix';
import fshaderSource from '../app/sl/lightFshader.glsl';
import vshaderSource from '../app/sl/lightVshader.glsl';
import { Geo } from './geo/geoClass';
import { Cube as cubeClass } from './geo/cubeClass';

function lightMain(canvas:HTMLCanvasElement){
    var { gl,program } = initWebgl(canvas,vshaderSource,fshaderSource);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawLightMain({
        gl:gl,
        program:program,
        canvas:canvas
    });
    attach(canvas);
}

function drawLightMain(rederObj:drawInterface){
    let {gl,program,canvas} = rederObj;
    let cubes:Geo[] = [];
    cubes.push(new cubeClass(0,0,0));
    var positionBuffer = BufferBind({
        gl:gl,
        program:program,
        locationFuncionType:LocationFuncType.attr,
        varName:'a_Position',
        size:3,
        type:gl.FLOAT,
        normalize:false,
        stride:3*4,
        offset:0
    });

    var colorBuffer = BufferBind({
        gl:gl,
        program:program,
        locationFuncionType:LocationFuncType.attr,
        varName:'a_Color',
        size:4,
        type:gl.FLOAT,
        normalize:false,
        stride:4*4,
        offset:0
    });
    var normalBufer = BufferBind({
        gl:gl,
        program:program,
        locationFuncionType:LocationFuncType.attr,
        varName: 'a_Normal',
        size:3,
        type:gl.FLOAT,
        normalize:false,
        stride:3*4,
        offset:0
    });


    var indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indicesBuffer);

    var u_Matrix = gl.getUniformLocation(program,'u_Matrix');
    let aspect = canvas.width/canvas.height;
    var projectionMatrix = ortho(-aspect*4,aspect*4,-4,4,100,-100);
    var curMatrix = identity();
    curMatrix = multiply(projectionMatrix,curMatrix);

    let moduleMatrix = identity();

    gl.enable(gl.CULL_FACE);

    let u_LightColor = gl.getUniformLocation(program,'u_LightColor');
    gl.uniform3f(u_LightColor,1, 1, 1);
    
    let u_AmbientFactor = gl.getUniformLocation(program,'u_AmbientFactor');
    gl.uniform1f(u_AmbientFactor,0);

    let u_LightPosition = gl.getUniformLocation(program,'u_LightPosition');

    gl.uniform3f(u_LightPosition,0,0,0.7);

    let u_ModuleMatrix = gl.getUniformLocation(program,'u_ModuleMatrix');

    function drawRotateCube(){
        var xAngle = 1;
        // var yAngle = Math.random();
        curMatrix = rotateX(curMatrix,deg2radians(xAngle));
        // curMatrix = rotateY(curMatrix,deg2radians(yAngle));
        moduleMatrix = rotateX(moduleMatrix,deg2radians(xAngle));
        gl.uniformMatrix4fv(u_Matrix,false,curMatrix);
        gl.uniformMatrix4fv(u_ModuleMatrix,false,moduleMatrix);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(let i = 0;i<cubes.length;i++){
            let nowCube = cubes[i];
            gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,nowCube.getPositions(),gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,nowCube.getColors(),gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER,normalBufer);
            gl.bufferData(gl.ARRAY_BUFFER,nowCube.getNormals(),gl.STATIC_DRAW);

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
    lightMain
}