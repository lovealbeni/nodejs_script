import { drawInterface,initWebgl,attach } from './util';
import { identity,multiply,rotateX,rotateY,ortho } from './matrix';
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
    let {gl,program,canvas} = rederObj;
    let { colors,indices,positions } = createCube(1,1,1);
    console.log({colors,indices,positions});
    var a_Position = gl.getAttribLocation(program,'a_Position');
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,positions,gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_Position);
    var positionSize = 3;
    var positionType = gl.FLOAT;
    var positionNormalize = false;
    var positionStride = 3*4;
    var positionOffset = 0;
    gl.vertexAttribPointer(a_Position,positionSize,positionType,positionNormalize,positionStride,positionOffset);

    var a_Color = gl.getAttribLocation(program,'a_Color');
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,colors,gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_Color);
    var colorSize = 4;
    var colorType = gl.FLOAT;
    var colorNormalize = false;
    var colorStride = 4*4;
    var colorOffset = 0;
    gl.vertexAttribPointer(a_Color,colorSize,colorType,colorNormalize,colorStride,colorOffset);

    var indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);

    var u_Matrix = gl.getUniformLocation(program,'u_Matrix');


    gl.enable(gl.CULL_FACE);

    gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
    setTimeout(()=>{
        let curMatrix = identity();
        animate(gl,1,1,u_Matrix,curMatrix,indices.length,canvas,true);
    },200);
}

function deg2radians(angle){
    return (angle * Math.PI)/180;
}

function animate(gl:WebGLRenderingContext,xAngle:number,yAngle:number,u_Matrix,curMatrix,length,canvas:HTMLCanvasElement,isFirst:boolean){
    gl.uniformMatrix4fv(u_Matrix,false,curMatrix);
    curMatrix = rotateX(curMatrix,deg2radians(xAngle));
    curMatrix = rotateY(curMatrix,deg2radians(yAngle));
    if(isFirst){
        let aspect = canvas.width/canvas.height;
        var projectionMatrix = ortho(-aspect*4,aspect*4,-4,4,100,-100);
        curMatrix = multiply(projectionMatrix,curMatrix);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES,length,gl.UNSIGNED_SHORT,0);
    requestAnimationFrame(function(){
        animate(gl,xAngle,yAngle,u_Matrix,curMatrix,length,canvas,false);
    });
    // setTimeout(() => {
    //     animate(gl,xAngle,yAngle,u_Matrix,curMatrix,length,canvas,false);
    // }, 1000);
}

function createCube(width:number,height:number,depth:number){
    let zeroX = width/2 , zeroY = height/2 , zeroZ = depth/2;
    let cornerPosition = [
        [-zeroX, -zeroY, -zeroZ],
        [zeroX, -zeroY, -zeroZ],
        [zeroX, zeroY, -zeroZ],
        [-zeroX, zeroY, -zeroZ],
        [-zeroX, -zeroY, zeroZ],
        [-zeroX, zeroY, zeroZ],
        [zeroX, zeroY, zeroZ],
        [zeroX, -zeroY, zeroZ]
    ];//一个正方形所有的顶点坐标，每个坐标有x,y,z三个分量
    const CUBE_FACE_INDICES = [
        [0, 1, 2, 3], //前面
        [4, 5, 6, 7], //后面
        [0, 3, 5, 4], //左面
        [1, 7, 6, 2], //右面
        [3, 2, 6, 5], //上面
        [0, 4, 7, 1] // 下面
    ];
    const FACE_COLORS = [
        [1, 0, 0, 1], // 前面，红色
        [0, 1, 0, 1], // 后面，绿色
        [0, 0, 1, 1], // 左面，蓝色
        [1, 1, 0, 1], // 右面，黄色
        [1, 0, 1, 1], // 上面，品色
        [0, 1, 1, 1]  // 下面，青色
    ];
    let colors = [];
    let positions = [];
    let indices = [];
    for(let f = 0; f < 6;++f){
        let faceIndices = CUBE_FACE_INDICES[f]; //每一个面的索引
        let color = FACE_COLORS[f];
        for(let v = 0; v < 4;++v){
            let position = cornerPosition[faceIndices[v]];
            positions = positions.concat(position);
            colors = colors.concat(color);
        }
        let offset = 4*f;
        indices.push(offset+0,offset+1,offset+2);
        indices.push(offset+0,offset+2,offset+3);
    }
    let fcolors = new Float32Array(colors);
    let fpositions = new Float32Array(positions);
    let findices = new Uint16Array(indices);

    return {
        positions:fpositions,
        colors:fcolors,
        indices:findices
    }
}

export {
    cubeMain
}