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
        return new Promise(resolve => {
			let img = new Image();
			img.className = 'debug';
			img.onload = function() {
				resolve(img);
			};
			img.src = src;
		});
    }
    exportGif(){
        return new Promise(async (resolve, reject) => {
			await this.genFrame();
			let gif = new Gif({
				worker: 500,
				quality: 10,
				workerScript: 'gif.worker.js',
				debug: true,
				width: this.config.width,
				height: this.config.height,
				background:'#000'
			});
			for (
				let sectionIndex = 0, length = this.sectionArray.length;
				sectionIndex < length;
				sectionIndex++
			) {
				let img = await this.loadImg(this.sectionArray[sectionIndex]);
				gif.addFrame(img, {
					delay: 83
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