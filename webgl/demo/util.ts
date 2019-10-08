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
    drawInterface
}