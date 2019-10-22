precision mediump float;
attribute vec3 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
uniform mat4 u_Matrix;
void main(){
    gl_Position = u_Matrix * vec4(a_Position,1);
    v_Color = a_Color;
}