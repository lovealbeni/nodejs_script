import { drawInterface,initWebgl,attach } from './util'
import fshaderSource from '../app/sl/textureFshader.glsl';
import vshaderSource from '../app/sl/textureVshader.glsl';

function textureMain(canvas:HTMLCanvasElement){
    var { gl,program } = initWebgl(canvas,vshaderSource,fshaderSource);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawTextureMain({
        gl:gl,
        program:program,
        canvas:canvas
    });
    attach(canvas);
}

function prepareTextureImg(url:String){
    // 准备纹理贴图的
    return new Promise<HTMLImageElement>((resove,reject)=>{
        var img = new Image();
        img.onload = function(){
            resove(img);
        };
        img.src = url.toString();
    });
}

function prepareTexturePositions(){
    var positions = [
        30,30,0,0,
        30,300,0,1,
        300,300,1,1,
        30,30,0,0,
        300,300,1,1,
        300,30,1,0
    ];
    return positions;
}

function drawTextureMain(rederObj:drawInterface){
    var positions = prepareTexturePositions();
    var {gl,program,canvas} = rederObj;
    var a_Position = gl.getAttribLocation(program,'a_Position');
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_Position);
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var textureStride = 4*4; // 纹理坐标的数据量（2个坐标，2个纹理坐标）
    var offset = 0;
    var textureOffset = 2*4; //有两个坐标
    //  顶点属性指针
    gl.vertexAttribPointer(a_Position,size,type,normalize,textureStride,offset);

    // 纹理坐标传入
    var a_Uv = gl.getAttribLocation(program,'a_Uv');
    gl.enableVertexAttribArray(a_Uv);
    gl.vertexAttribPointer(a_Uv,size,type,normalize,textureStride,textureOffset);

    // 获取屏幕尺寸
    var a_Screen_size = gl.getAttribLocation(program,'a_Screen_size');
    gl.vertexAttrib2f(a_Screen_size,canvas.width,canvas.height);

    // 初始化纹理
    var uniformTexture = gl.getUniformLocation(program,'texture');
    prepareTextureImg('./app/timg.jpg').then(img=>{
        gl.activeTexture(gl.TEXTURE0);
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
        gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
        gl.uniform1i(uniformTexture,0);

        var primitiveType = gl.TRIANGLE_FAN;
        var offset = 0;
        var count = 4;
        count = positions.length/4;//和stride的值相等，生成的数组里面有6个坐标形成一个点，所以要/6
        gl.drawArrays(primitiveType,offset,count);
    });
}

export { 
    textureMain
 }