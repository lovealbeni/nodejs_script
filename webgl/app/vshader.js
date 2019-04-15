var VSHADER_SOURCE = '';
VSHADER_SOURCE+='attribute vec4 a_Position;'
VSHADER_SOURCE+='uniform mat4 u_xformMatrix;'
VSHADER_SOURCE+='void main(){';
VSHADER_SOURCE+='gl_Position=a_Position * u_xformMatrix;';
VSHADER_SOURCE+='gl_PointSize=10.0;';
VSHADER_SOURCE+='}';
var FSHADER_SOURCE = '';
FSHADER_SOURCE+='void main(){'
FSHADER_SOURCE+='gl_FragColor = vec4(1.0,0.0,0.0,1.0);';
FSHADER_SOURCE+='}';
export default {VSHADER_SOURCE,FSHADER_SOURCE}