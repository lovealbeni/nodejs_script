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
					return percent;
				},
				frameCount: 23
			},
			config
		);
		this.gifCanvas.width = this.config.width;
		this.gifCanvas.height = this.config.height;
		this.gifCanvasContext.fillStyle = '#000';
		// this.frameCount = config.frameCount || 10;
	}
	initFrameArray(){
		return new Promise(async(resolve)=>{
			let firstLoopFrame;
			for(let imgIndex=0,length=this.config.img.length;imgIndex<length;imgIndex+=2){
				let frame = this.createFrame();
				frame.drawImage({
					src:await this.loadImg(this.config.img[imgIndex]),
					x:0,
					y:0,
					width:90,
					height:90
				});
				frame.drawImage({
					src:await this.loadImg(this.config.img[imgIndex+1]),
					x:200,
					y:0,
					width:90,
					height:90
				});
				if(imgIndex==0){
					firstLoopFrame = frame;
				}
				this.addFrame(frame);
			}
			this.addFrame(firstLoopFrame);
			resolve();
		})
	}
	mergeFrame(){
		let mergeCanvas = document.createElement('canvas');
		let mergeCanvasContext = mergeCanvas.getContext('2d');
		mergeCanvas.width = this.frameArray[0].width;
		mergeCanvas.height = this.frameArray[0].height * this.frameArray.length;
		for(let frameIndex=0;frameIndex<this.frameArray.length;frameIndex++){
			let frame = this.frameArray[frameIndex];
			mergeCanvasContext.drawImage(frame,0,0,frame.width,frame.height,0,frame.height*frameIndex,frame.width,frame.height);
		}
		return mergeCanvas;
	}
	genFrame() {
		return new Promise(async(resolve) => {
			let { funX, funY } = this.config;
			await this.initFrameArray();
			let animationCanvas = this.mergeFrame();
			let x, y, currentCanvas, nextCanvas, nextX, nextY;
			if (typeof funY != 'function') {
				throw new Error('arguments need function');
			}
			for(let frameIndex=0;frameIndex<this.config.frameCount;frameIndex++){
				let percent = frameIndex/this.config.frameCount;
				let y = this.config.funY(percent);
				if(y>0.5){
					break;
				}else{
					y = y*animationCanvas.height;
				}
				this.gifCanvasContext.clearRect(0,0,this.config.width,this.config.height);
				this.gifCanvasContext.drawImage(animationCanvas,0,y,this.config.width,this.config.width,0,0,this.config.width,this.config.height)
				this.sectionArray.push(
					this.gifCanvas.toDataURL('image/jpeg')
				)
			}
			console.log('genFrame',this.sectionArray);
			resolve();
		});
	}
}
export default GifMaker;
