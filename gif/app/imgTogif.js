import BaseGif from './BaseGif';
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
					return 0;
				},
				funY: percent => {
					return (2*percent)/3;
				},
				frameCount: 23
			},
			config
		);
		this.gifCanvas.width = this.config.width;
		this.gifCanvas.height = this.config.height;
		this.gifCanvasContext.fillStyle = 'rgb(255,255,255)';
		// this.frameCount = config.frameCount || 10;
	}
	initFrameArray(){
		return new Promise(async(resolve)=>{
			let firstLoopFrame;
			for(let imgIndex=0,length=this.config.img.length;imgIndex<length;imgIndex+=2){
				let frame = this.createFrame({
					width:402,
					height:163
				});
				frame.drawImage({
					src:await this.loadImg(this.config.img[imgIndex]),
					x:0,
					y:0,
					width:163,
					height:163
				});
				frame.drawImage({
					src:await this.loadImg(this.config.img[imgIndex+1]),
					x:239,
					y:0,
					width:163,
					height:163
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
			let backgroundCanvas = document.createElement('canvas');
			let backgroundCanvasContext = backgroundCanvas.getContext('2d');
			backgroundCanvas.width = 621;
			backgroundCanvas.height = 292;
			let backgroundImg = await this.loadImg(this.config.backgroundImg);
			await this.initFrameArray();
			let animationCanvas = this.mergeFrame();
			if (typeof funY != 'function') {
				throw new Error('arguments need function');
			}
			for(let frameIndex=0;frameIndex<this.config.frameCount;frameIndex++){
				let percent = frameIndex/this.config.frameCount;
				let y = this.config.funY(percent);
				y = y*animationCanvas.height;
				backgroundCanvasContext.clearRect(0,0,backgroundCanvas.width,backgroundCanvas.height);
				this.gifCanvasContext.clearRect(0,0,this.config.width,this.config.height);
				this.gifCanvasContext.drawImage(animationCanvas,0,y,402,163,0,0,402,163);
				backgroundCanvasContext.drawImage(backgroundImg,0,0,backgroundCanvas.width,backgroundCanvas.height,0,0,backgroundCanvas.width,backgroundCanvas.height);
				backgroundCanvasContext.drawImage(this.gifCanvas,0,0,402,163,87,92,407,178);
				let delayTime = (frameIndex==0||frameIndex==11)?850:40;
				this.sectionArray.push({
					img:backgroundCanvas.toDataURL('image/jpeg'),
					delayTime
				});
			}
			console.log('genFrame',this.sectionArray);
			resolve(this.sectionArray);
		});
	}
}
export default GifMaker;
