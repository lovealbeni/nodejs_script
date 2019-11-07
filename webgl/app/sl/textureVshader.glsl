precision mediump float;
attribute vec2 a_Position;
attribute vec2 a_Screen_size;
attribute vec4 a_Color;
attribute vec2 a_Uv;
varying vec2 v_Uv;
varying vec4 v_Color;
void main(){
    vec2 position = (a_Position/a_Screen_size) * 2.0 -1.0;
    position = position * vec2(1.0,-1.0);
    gl_Position = vec4(position,0,1);
    // v_Color = a_Color;
    v_Uv = a_Uv;
}