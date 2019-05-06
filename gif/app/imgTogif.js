import BaseGif from './BaseGif';
const halfPI = (Math.PI)/2;
class GifMaker extends BaseGif{
	// config 传入 画布大小
	constructor(config) {
		// todo:检查运行环境,config参数
		super(config);
		this.config = Object.assign(
			{
				funY: percent => {
					return Math.sin(percent*halfPI);
					// return percent;
				},
				frameWidth:402,
				frameHeigh:163,
				perPicWidth:163,
				perPicHeight:163,
				firstPicLoc:{x:0,y:0},
				secondPicLoc:{x:239,y:0},
				animationLoc:{x:87,y:92},
				keyFrameDelay:2000,
				otherFrameDelay:30
			},
			config
		);
		// this.config.funY = percent=>{
		// 	return ( (this.frameArray.length-1)*percent )/this.frameArray.length;
		// }
		this.gifCanvasContext.fillStyle = 'rgb(255,255,255)';
	}
	initFrameArray(){
		return new Promise(async(resolve)=>{
			let firstLoopFrame;
			for(let imgIndex=0,length=this.config.img.length;imgIndex<length;imgIndex+=2){
				let frame = this.createFrame({
					width:this.config.frameWidth,
					height:this.config.frameHeigh
				});
				try {
					frame.drawImage({
						src:await this.loadImg(this.config.img[imgIndex]),
						x:this.config.firstPicLoc.x,
						y:this.config.firstPicLoc.y,
						width:this.config.perPicWidth,
						height:this.config.perPicHeight
					});
					frame.drawImage({
						src:await this.loadImg(this.config.img[imgIndex+1]),
						x:this.config.secondPicLoc.x,
						y:this.config.secondPicLoc.y,
						width:this.config.perPicWidth,
						height:this.config.perPicHeight
					});
				} catch (error) {
					throw new Error(error);
				}
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
		mergeCanvas.width = this.config.frameWidth;
		mergeCanvas.height = this.config.frameHeigh * this.frameArray.length;
		for(let frameIndex=0;frameIndex<this.frameArray.length;frameIndex++){
			let frame = this.frameArray[frameIndex];
			mergeCanvasContext.drawImage(frame,0,0,frame.width,frame.height,0,frame.height*frameIndex,frame.width,frame.height);
		}
		return mergeCanvas;
	}
	genFrame() {
		return new Promise(async(resolve) => {
			let { funY } = this.config;
			let animationCanvas = document.createElement('canvas');
			let animationCanvasContext = animationCanvas.getContext('2d');
			animationCanvas.width = this.config.frameWidth;
			animationCanvas.height = this.config.frameHeigh;
			let backgroundImg;
			if(this.config.backgroundImg){
				backgroundImg = await this.loadImg(this.config.backgroundImg);
			}
			await this.initFrameArray();
			let mergeFrame = this.mergeFrame();
			if (typeof funY != 'function') {
				throw new Error('arguments need function');
			}
			// let step = Math.ceil(this.config.frameHeigh/this.perFrameCount);
			for(let frameIndex=0,sumCount=(this.frameArray.length-1)*this.perFrameCount;frameIndex<sumCount;frameIndex++){
				let step = (frameIndex%this.perFrameCount)/(this.perFrameCount-1);
                let hasPassed = Math.floor(frameIndex/this.perFrameCount);
                let y = funY(step)*this.config.frameHeigh + hasPassed*this.config.frameHeigh;
				
				animationCanvasContext.clearRect(0,0,animationCanvas.width,animationCanvas.height);
				this.gifCanvasContext.clearRect(0,0,this.config.width,this.config.height);

				animationCanvasContext.drawImage(mergeFrame,0,y,this.config.frameWidth,this.config.frameHeigh,0,0,this.config.frameWidth,this.config.frameHeigh);
				if(this.config.backgroundImg){
					this.gifCanvasContext.drawImage(backgroundImg,0,0,this.width,this.height,0,0,this.width,this.height);
				}
				this.gifCanvasContext.drawImage(animationCanvas,0,0,this.config.frameWidth,this.config.frameHeigh,this.config.animationLoc.x,this.config.animationLoc.y,this.config.frameWidth,this.config.frameHeigh);
				let delayTime;
				if(frameIndex%this.perFrameCount==0){
					delayTime = this.config.keyFrameDelay;
				}else{
					delayTime = this.config.otherFrameDelay;
				}
				this.sectionArray.push({
					img:this.gifCanvas.toDataURL('image/jpeg'),
					delayTime
				});
			}
			resolve(this.sectionArray);
		});
	}
}
export default GifMaker;
