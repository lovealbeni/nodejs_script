import Matrix from './cuon-matrix';
import { textureMain } from '../demo/texture';
import { circleMain } from '../demo/circle';
import { cubeMain } from '../demo/cube';
function main(){
    var functionMap = {
        circle:circleMain,
        texture:textureMain,
        cube:cubeMain
    };
    var canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = canvas.width * 0.6;
    var drawType = 'cube';

    functionMap[drawType](canvas);

}
window.onload = main;