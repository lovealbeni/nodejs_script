import Gif from './gif';
import Frame from './Frame';
class BaseGif{
    constructor(data){
		this.data = data;
        this.gifCanvas = document.createElement('canvas');
        this.gifCanvasContext = this.gifCanvas.getContext('2d');
        this.frameArray = [];
        this.sectionArray = [];
        this.width = 400;
        this.height = 400;
    }
    createFrame(config){
        return new Frame(
			Object.assign({ width: this.width, height: this.height }, config)
		);
    }
    addFrame(frame){
        if(!(frame instanceof Frame)){
            throw new Error('need a Frame');
        }
		this.frameArray.push(frame.getCanvas());
    }
    genFrame(){}
    loadImg(src){
        return new Promise((resolve,reject) => {
			let img = new Image();
			img.className = 'debug';
			img.onload = function() {
				resolve(img);
			};
			img.onerror = function(error){
				reject(error);
			}
			img.src = src;
		});
    }
    exportGif(){
        return new Promise(async (resolve, reject) => {
			let sectionArray = await this.genFrame();
			let gif = new Gif({
				worker: 500,
				quality: 50,
				workerScript: 'gif.worker.js',
				debug: true,
				width: this.config.width,
				height: this.config.height,
				background:'#000'
			});
			for (
				let sectionIndex = 0, length = sectionArray.length;
				sectionIndex < length;
				sectionIndex++
			) {
				let img = await this.loadImg(sectionArray[sectionIndex].img);
				gif.addFrame(img, {
					delay: sectionArray[sectionIndex].delayTime
				});
			}

			gif.on('finished', function(blob) {
				resolve(webkitURL.createObjectURL(blob));
			});
			gif.render();
		});
    }
}
export default BaseGif;