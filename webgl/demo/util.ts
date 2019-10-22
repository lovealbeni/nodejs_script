enum LocationFuncType{
    attr=1,
    uniform=2
}
function initWebgl(canvas:HTMLCanvasElement,vshaderSource,fshaderSource){
    var gl = canvas.getContext('webgl');
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vshaderSource);
    gl.compileShader(vertexShader);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fshaderSource);
    gl.compileShader(fragmentShader);
    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    return {
        gl,program
    }
}

interface bufferBindInterface{
    gl:WebGLRenderingContext,
    program:WebGLProgram,
    locationFuncionType:number,
    varName:string,
    size:number,
    type:number,
    normalize:boolean,
    stride:number,
    offset:number
}

function BufferBind(bindObj:bufferBindInterface):WebGLBuffer{
    let { gl,program,locationFuncionType,varName,size,type,normalize,stride,offset } = bindObj;
    let bindName;
    if(locationFuncionType == LocationFuncType.attr){
        bindName = gl.getAttribLocation(program,varName);
    } else if (locationFuncionType == LocationFuncType.uniform){
        bindName = gl.getUniformLocation(program,varName);
    }
    let bindBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bindBuffer);
    gl.enableVertexAttribArray(bindName);
    // 这里要特殊注意一下，js的执行时根据当前的情况来默认绑定的，也就是说，执行vertexAttribPointer的时候，会把当前的
    // attribute和buffer绑定在一起，反例可以将下面代码复制到colorbuffer的vertex上方，就会发现不一样的情况
    gl.vertexAttribPointer(bindName,size,type,normalize,stride,offset);
    return bindBuffer;
}

function attach(dom:HTMLElement){
    var body = document.querySelector('body');
    body.appendChild(dom);
}

interface drawInterface{
    gl:WebGLRenderingContext,
    program:WebGLProgram,
    canvas:HTMLCanvasElement
}

export {
    initWebgl,
    attach,
    drawInterface,
    BufferBind,
    LocationFuncType
}