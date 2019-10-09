import Matrix from './cuon-matrix';
import { textureMain } from '../demo/texture';
import { circleMain } from '../demo/circle';
function main(){
    var functionMap = {
        circle:circleMain,
        texture:textureMain
    };
    var canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = canvas.width * 0.6;
    var drawType = 'texture';

    functionMap[drawType](canvas);

}
window.onload = main;