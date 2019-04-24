import BaseGif from './BaseGif';
const halfOfPI = (Math.PI)/2;
const DIRECTION = {
	TOP: 'top', //向上
	RIGHT: 'right', //向右
	BOTTOM: 'bottom', //向下
	LEFT: 'left' //向左
};
class GifMaker extends BaseGif{
	// config 传入 画布大小
	constructor(config) {
		// todo:检查运行环境,config参数
		super(config);
		this.config = Object.assign(
			{
				width: 400,
				height: 400,
				img: [],
				funX: percent => {
					// return Math.sin(percent*halfOfPI);
					return 0;
				},
				funY: percent => {
					return Math.sin(percent * halfOfPI);
				},
				frameCount: 10
			},
			config
		);
		this.gifCanvas.width = this.config.width;
		this.gifCanvas.height = this.config.height;
		this.gifCanvasContext.fillStyle = 'white';
		// this.frameCount = config.frameCount || 10;
	}
	genFrame() {
		return new Promise(async(resolve) => {
			let { funX, funY } = this.config;
			let frame = this.createFrame({
				width:this.config.width,
				height:this.config.height
			});
			let imgs = [];
			for(let imgIndex=0,length=this.config.img.length;imgIndex<length;imgIndex++){
				imgs.push(await this.loadImg(this.config.img[imgIndex]));
			}
			frame.drawImage({
				src: imgs[0]
			});
			this.addFrame(frame);
			this.addFrame(frame);

			let x, y, currentCanvas, nextCanvas, nextX, nextY;
			if (typeof funX != 'function' || typeof funY != 'function') {
				throw new Error('arguments need function');
			}
			for (
				let frameIndex = 0, length = this.frameArray.length - 1;
				frameIndex < length;
				frameIndex++
			) {
				currentCanvas = this.frameArray[frameIndex];
				nextCanvas = this.frameArray[frameIndex + 1];
				for (
					let sectionIndex = 0;
					sectionIndex < this.config.frameCount;
					sectionIndex++
				) {
					let percent = sectionIndex / this.config.frameCount;
					x = nextX = funX(percent) * this.config.width;
					y = nextY = funY(percent) * this.config.height;
					if (x + y > 0) {
						nextX = x == 0 ? this.config.width : x;
						nextY = y == 0 ? this.config.height : y;
					}
					this.gifCanvasContext.clearRect(
						0,
						0,
						this.config.width,
						this.config.height
					);
					this.gifCanvasContext.drawImage(
						currentCanvas,
						x,
						y,
						currentCanvas.width - x,
						currentCanvas.height - y,
						0,
						0,
						currentCanvas.width - x,
						currentCanvas.height - y
					);
					this.gifCanvasContext.drawImage(
						nextCanvas,
						0,
						0,
						nextX,
						nextY,
						currentCanvas.width - nextX,
						currentCanvas.height - nextY,
						nextX,
						nextY
					);
					this.sectionArray.push(
						this.gifCanvas.toDataURL('image/jpeg')
					);
				}
			}
			console.log('genFrame',this.sectionArray);
			resolve();
		});
	}
}
export default GifMaker;
