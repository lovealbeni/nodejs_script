const GIFEncoder = require('gifencoder');
const { createCanvas,loadImage } = require('canvas');
const fs = require('fs');
const GifMaker = require('./imgTogif');
const NodeFrame = require('./NodeFrame');

const canvas = createCanvas(621,292);

class NodeGifMaker extends GifMaker {
    constructor(config){
        super(config);
        this.gifCanvas = createCanvas(this.width,this.height);
    }
    createFrame(config){
        return new NodeFrame(
			Object.assign({ width: this.width, height: this.height }, config)
        );
    }
    addFrame(frame){
        if(!(frame instanceof NodeFrame)){
            throw new Error('need a node frame');
        }
        this.frameArray.push(frame.getCanvas());
    }
    loadImg(src){
        return loadImage(src);
    }
    mergeFrame(){
		let mergeCanvas = createCanvas(this.config.frameWidth,this.config.frameHeigh*this.frameArray.length);
		let mergeCanvasContext = mergeCanvas.getContext('2d');
		for(let frameIndex=0;frameIndex<this.frameArray.length;frameIndex++){
			let frame = this.frameArray[frameIndex];
			mergeCanvasContext.drawImage(frame,0,0,frame.width,frame.height,0,frame.height*frameIndex,frame.width,frame.height);
		}
		return mergeCanvas;
	}
    exportGif(){
        return new Promise(async (resolve,reject)=>{
            let sectionArray = await this.genFrame();
            let encoder = new GIFEncoder(this.width,this.height);
            encoder.createReadStream().pipe(fs.createWriteStream('nodegif.gif'));
            encoder.setRepeat(0);
            encoder.setQuality(this.gifConfig.quality);
            for(
                let sectionIndex = 0,length = sectionArray.length;
                sectionIndex<length;
                sectionIndex ++
            ){
                let img = await this.loadImg(sectionArray[sectionIndex].img);
                encoder.addFrame(img);
            }
            encoder.finish();
            resolve('ok');
        });
    }
    genFrame() {
		return new Promise(async(resolve) => {
			let { funY } = this.config;
			let animationCanvas = createCanvas(this.config.frameWidth,this.config.frameHeigh);
			let animationCanvasContext = animationCanvas.getContext('2d');
			let backgroundImg;
			if(this.config.backgroundImg){
				backgroundImg = await this.loadImg(this.config.backgroundImg);
			}
			await this.initFrameArray();
			let mergeFrame = this.mergeFrame();
			if (typeof funY != 'function') {
				throw new Error('arguments need function');
			}
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

new NodeGifMaker({
    img: ['./1.png','./2.png','./3.png','./4.png','./2.png','./3.png'],
		width:621,
		height:292,
		backgroundImg:'./background.jpg',
		funY:percent=>{
			return percent;
        }
}).exportGif().then(src=>{
    console.log(src);
});