precision mediump float;
varying vec4 v_Color;
void main(){
    vec4 color = v_Color/vec4(255,255,255,1);
    gl_FragColor = color;
}