import BaseGif from './BaseGif';
class TextColum extends BaseGif{
    constructor(config){
        super(config);
        this.config = Object.assign(
            {
                funY:percent=>{
                    return ( (this.frameArray.length-1)*percent )/this.frameArray.length;
                },
                frameWidth:792,
                frameHeigh:34,
                textArray:[],
                animationLoc:{x:300,y:33},
                keyFrameDelay:2000,
                otherFrameDelay:30,
                fontSize:34
            },
            config
        )
    }
    initSvg(str){
        return new Promise(async(resolve,reject)=>{
            let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
            let svgWidth = this.config.frameWidth,svgHeight = this.config.frameHeigh;
            svg.setAttribute('width',svgWidth);
            svg.setAttribute('height',svgHeight);

            let path = document.createElementNS('http://www.w3.org/2000/svg','path');
            path.setAttribute('id','textPath');
            path.setAttribute('d',`M0 ${((svgHeight+this.config.fontSize)/2)} H ${svgWidth}`);
        
            svg.appendChild(path);

            let text = document.createElementNS('http://www.w3.org/2000/svg','text');
            text.setAttribute('font-size',this.config.fontSize);
            text.setAttribute('fill','black');
            let textPath = document.createElementNS('http://www.w3.org/2000/svg','textPath');
            textPath.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#textPath');

            textPath.innerHTML = str;
            text.appendChild(textPath);
            svg.appendChild(text);
            
            document.body.appendChild(svg);


            let serializer = new XMLSerializer();
            let svgStr = serializer.serializeToString(svg);
            try {
                let img = await this.loadImg('data:image/svg+xml;base64,'+window.btoa(svgStr));
                resolve(img);
            } catch (error) {
                reject(error);
            }
           
        });
    }
    initFrameArray(){
        return new Promise(async(resolve)=>{
            let firstLoopFrame;
            for(let textIdx=0;textIdx<this.config.textArray.length;textIdx++){
                let frame = this.createFrame({
                    width:this.config.frameWidth,
                    height:this.config.frameHeigh
                });
                try{
                    frame.drawImage({
                        src:await this.initSvg(this.config.textArray[textIdx]),
                        x:0,
                        y:0,
                        width:this.config.frameWidth,
                        height:this.config.frameHeigh
                    })
                }catch(error){
                    throw new Error(error);
                }
                if(textIdx==0){
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
    genFrame(){
        return new Promise(async(resolve)=>{
            let {funY} = this.config;
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
            if(typeof funY != 'function'){
                throw new Error('arguments need function');
            }
			let step = Math.ceil(this.config.frameHeigh/this.perFrameCount);
            for(let frameIndex=0,sumCount=(this.frameArray.length-1)*this.perFrameCount;frameIndex<sumCount;frameIndex++){
                let y = step*frameIndex


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
					img:this.gifCanvas.toDataURL('image/png'),
					delayTime
				});
            }
            console.log('sectionArray',this.sectionArray);
            resolve(this.sectionArray);
        });
    }
}

function svg(){
    let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    let svgWidth = 300,svgHeight = 200;
    svg.setAttribute('width',svgWidth);
    svg.setAttribute('height',svgHeight);

    let path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('id','textPath');
    path.setAttribute('d',`M0 ${svgHeight/2} H ${svgWidth}`);

    svg.appendChild(path);



    
    let text = document.createElementNS('http://www.w3.org/2000/svg','text');
    let textPath = document.createElementNS('http://www.w3.org/2000/svg','textPath');
    textPath.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#textPath');
    // textPath.setAttribute('text-anchor','middle');
    // textPath.setAttribute('startOffset','50%');
    textPath.innerHTML = '12312312312312312312312312312312312312312312312312312';
    text.appendChild(textPath);
    svg.appendChild(text);

    document.body.appendChild(svg);
    





    let serializer = new XMLSerializer();
    let svgStr = serializer.serializeToString(svg);
    let img = new Image();
    img.src = 'data:image/svg+xml;base64,'+window.btoa(svgStr);
    let canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 200;
    let context = canvas.getContext('2d');
    img.onload = function(){
        context.drawImage(img,0,0,canvas.width,canvas.height);
        document.body.appendChild(canvas);
    }
}
export default TextColum;