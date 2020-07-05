precision highp float;
uniform vec2 u_Screen;
varying vec3 v_Position;
uniform float u_Time;
const float PI = 3.1415926;

void main () {
    // 将坐标系坐标范围约束在【-4，4】和【-5，3】之间。
    vec2 pos = ( gl_FragCoord.xy / u_Screen.xy )*8.-vec2(4., 5.);
    if(pos.y>-5.){
        pos.y += 0.1 * sin(u_Time * 3.) + 0.13 * cos(u_Time * 2. + 0.6) + .1 * sin(u_Time * 3. + 0.4) + 0.2 * fract(sin(u_Time * 400.));
    }
    vec3 color = vec3(0., 0., 0.0);
    float y = -pow(pos.x, 3.2)/(0.008) * 3.3;
    //计算当前点与抛物线点的距离，并缩小距离范围。
    float dir = length(pos-vec2(pos.x, y)) * sin(0.3);
    if(dir < 0.7){
        color.rg += smoothstep(0.0,1.,.75-dir);
        //弱化绿色通道颜色
        color.g /=2.4;
    }
    //强化红色通道颜色。
    color += pow(color.r,1.1);
    gl_FragColor = vec4(vec3(color) , 1.0 );
}