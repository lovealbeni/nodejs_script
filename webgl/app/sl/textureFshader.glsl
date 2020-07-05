precision mediump float;
varying vec4 v_Color;
varying vec2 v_Uv;
uniform sampler2D texture;
void main(){
    vec4 color = v_Color/vec4(255,255,255,1);
    gl_FragColor = texture2D(texture,v_Uv);
    // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}