precision highp float;
uniform vec2 u_Screen;

void main() {
    float y = mix(0., u_Screen.y, gl_FragCoord.x/u_Screen.x);
    if(abs(y - gl_FragCoord.y) <= 1.){
        gl_FragColor = vec4(0, 1, 1, 1);
    } else {
        gl_FragColor = vec4(0, 0, 0, 1);
    }
    return;
}