import Matrix from './cuon-matrix';
import { textureMain } from '../demo/texture';
import { circleMain } from '../demo/circle';
function main(){
    var canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = canvas.width * 0.6;

    // ----- circle main ------
    circleMain(canvas);


    // ------ texture main -----
    // textureMain(canvas);

}
window.onload = main;