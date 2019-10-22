precision mediump float;
varying vec3 v_Normal;
varying vec4 v_Color;
uniform vec3 u_LightColor;
uniform float u_AmbientFactor;
uniform vec3 u_LightPosition;
void main(){
    vec3 ambient = u_AmbientFactor * u_LightColor;
    vec3 lightDirection = u_LightPosition - vec3(0,0,0);
    float diffuseFactor = dot(normalize(lightDirection),normalize(v_Normal));
    diffuseFactor = max(diffuseFactor,0.0);
    vec3 diffuseLightColor = diffuseFactor * u_LightColor;
    // 环境光部分加上反射光部分
    gl_FragColor = v_Color * vec4((ambient + diffuseLightColor),1);
}