var VSHADER_SOURCE = '';
VSHADER_SOURCE+='precision mediump float;'
VSHADER_SOURCE+='attribute vec2 a_Position;'
VSHADER_SOURCE+='attribute vec2 a_Screen_Size;';
VSHADER_SOURCE+='attribute vec4 a_Color;';
VSHADER_SOURCE+='varying vec4 v_Color;';
VSHADER_SOURCE+='void main(){';
VSHADER_SOURCE+='vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;';
VSHADER_SOURCE+='position = position * vec2(1.0, -1.0);';
VSHADER_SOURCE+='gl_Position = vec4(position, 0.0, 1.0);';
VSHADER_SOURCE+='v_Color = a_Color;';
VSHADER_SOURCE+='}';
var FSHADER_SOURCE = '';
FSHADER_SOURCE+='precision mediump float;'
FSHADER_SOURCE+='varying vec4 v_Color;'
FSHADER_SOURCE+='void main(){'
FSHADER_SOURCE+='vec4 color = v_Color/vec4(255,255,255,1)';
FSHADER_SOURCE+='gl_FragColor = color';
FSHADER_SOURCE+='}';
export default {VSHADER_SOURCE,FSHADER_SOURCE}