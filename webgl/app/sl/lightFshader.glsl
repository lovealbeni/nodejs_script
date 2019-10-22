precision mediump float;
varying vec4 v_Color;
uniform vec3 u_LightColor;
uniform float u_AmbientFactor;
void main(){
    vec3 anibientColor = u_AmbientFactor * u_LightColor;
    gl_FragColor = vec4(anibientColor,1)*v_Color;
}