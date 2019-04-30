import GIF from './gif';
import Frame from './Frame';

class BaseGif {
	constructor(data) {
		this.data = data;

		this.frameArray = [];
		this.sectionArray = [];

		this.imgArray = data.img || []; //要制作gif的素材图片

		// 整个gif的宽高
		this.width = data.width || 400;
		this.height = data.height || 400;

		this.gifCanvas = document.createElement('canvas');
		this.gifCanvasContext = this.gifCanvas.getContext('2d');
		this.gifCanvas.width = this.width;
		this.gifCanvas.height = this.height;

		this.perFrameCount = data.perFrameCount || 12;

		const GIFCONFIG = {
			worker: 2,
			quality: 50,
			workerScript: 'gif.worker.js',
			debug: false,
			width: this.width,
			height: this.height
		};
		this.gifConfig = Object.assign(GIFCONFIG, data.gifConfig);
	}
	createFrame(config) {
		return new Frame(
			Object.assign({ width: this.width, height: this.height }, config)
		);
	}
	addFrame(frame) {
		if (!(frame instanceof Frame)) {
			throw new Error('need a Frame');
		}
		this.frameArray.push(frame.getCanvas());
	}
	genFrame() {}
	loadImg(src) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = function() {
				resolve(img);
			};
			img.onerror = function(error) {
				reject(error);
			};
			img.src = src;
		});
	}
	exportGif() {
		return new Promise(async (resolve, reject) => {
			let sectionArray = await this.genFrame();
			let gif = new GIF(this.gifConfig);
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
