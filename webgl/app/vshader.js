var VSHADER_SOURCE = '';
VSHADER_SOURCE+='void main(){';
VSHADER_SOURCE+='gl_Position=vec4(0.0,0.0,0.0,1.0);';
VSHADER_SOURCE+='gl_PointSize=50.0;';
VSHADER_SOURCE+='}';
var FSHADER_SOURCE = '';
FSHADER_SOURCE+='void main(){'
FSHADER_SOURCE+='gl_FragColor = vec4(1.0,0.0,0.0,1.0);';
FSHADER_SOURCE+='}';
export default {VSHADER_SOURCE,FSHADER_SOURCE}