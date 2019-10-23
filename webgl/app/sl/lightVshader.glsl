precision mediump float;
attribute vec3 a_Position;
attribute vec4 a_Color;
attribute vec3 a_Normal;
varying vec3 v_Normal;
varying vec4 v_Color;
uniform mat4 u_Matrix;
uniform mat4 u_ModuleMatrix;
void main(){
    gl_Position = u_Matrix * vec4(a_Position,1);
    v_Color = a_Color;
    v_Normal = mat3(u_ModuleMatrix) * a_Normal;
}