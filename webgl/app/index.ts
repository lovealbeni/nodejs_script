import Matrix from './cuon-matrix';
import { textureMain } from '../demo/texture';
import { circleMain } from '../demo/circle';
import { cubeMain } from '../demo/cube';
import { lightMain } from "../demo/light";
import { shaderMain } from '../demo/shader';
function main(){
    var functionMap = {
        circle:circleMain,
        texture:textureMain,
        cube:cubeMain,
        light:lightMain,
        shader:shaderMain
    };
    var canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = canvas.width * 0.6;
    var drawType = 'shader';

    functionMap[drawType](canvas);

}
window.onload = main;