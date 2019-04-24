import Gif from './gif';
import Frame from './Frame';
const DIRECTION = {
    TOP:'top',//向上
    RIGHT:'right',//向右
    BOTTOM:'bottom',//向下
    LEFT:'left'//向左
}
class GifMaker{
    // config 传入 画布大小
    constructor(config){
        // todo:检查运行环境,config参数
        this.width = config.width || 400;
        this.height = config.height || 400;
        this.gifCanvas = document.createElement('canvas');
        this.gifCanvas.width = this.width;
        this.gifCanvas.height = this.height;
        this.gifCanvasContext = this.gifCanvas.getContext('2d');
        this.gifCanvasContext.fillStyle = "white";
        this.staticCanvs = document.createElement('canvas');
        this.staticCanvsContext = this.staticCanvs.getContext('2d');
        this.animationCanvas = document.createElement('canvas');
        this.animationCanvas.width = 2*this.width;//动画画布比gif画布大一倍,保证图片可以移动
        this.animationCanvas.height = 2*this.height;
        this.animationCanvasContext = this.animationCanvas.getContext('2d');
        this.frameArray = [];//存储画图的帧
        this.sectionArray = [];//根据
        this.frameCount = config.frameCount || 10;
    }
    createFrame(){
        return new Frame({width:this.width,height:this.height});
    }
    addFrame(frame){
        if(!(frame instanceof Frame)){
            throw new Error('need a Frame');
        }
        this.frameArray.push(frame.getCanvas());
    }
    addPic(picConfig){
        // 图片宽,高,src和x,y坐标
        try {
            this._addPicHandler(picConfig)
        } catch (error) {
            throw new Error(error);
        }
    }
    _addPicHandler(picConfig){
        if(picConfig.x + picConfig.width > this.animationCanvas.width){
            this.animationCanvas.width = picConfig.x + picConfig.width;
        }
        if(picConfig.y + picConfig.height > this.animationCanvas.height){
            this.animationCanvas.height = picConfig.y + picConfig.height;
        }
        this.animationCanvasContext.drawImage(picConfig.src,picConfig.x,picConfig.y,picConfig.width,picConfig.height);
    }
    drawGif(gifConfig){
        // 图片帧数,持续时间,方向
        try {
            return this._drawGifHandler(gifConfig);
        } catch (error) {
            throw new Error(error)
        }
    }
    genFrame({funX,funY}){
        let x,y,currentCanvas,nextCanvas,nextX,nextY;
        if(typeof funX != 'function' || typeof funY != 'function'){
            throw new Error('arguments need function');
        }
        for(let frameIndex=0,length=this.frameArray.length-1;frameIndex<length;frameIndex++){
            currentCanvas = this.frameArray[frameIndex];
            nextCanvas = this.frameArray[frameIndex+1];
            for(let sectionIndex=0;sectionIndex<this.frameCount;sectionIndex++){
                let percent = sectionIndex/this.frameCount;
                x = nextX = funX(percent)*this.width;
                y = nextY = funY(percent)*this.height;
                if(x+y>0){
                    nextX = (x==0)?this.width:x;
                    nextY = (y==0)?this.height:y;
                }
                this.gifCanvasContext.clearRect(0,0,this.width,this.height);
                console.log({nextX,nextY,x,y});
                this.gifCanvasContext.drawImage(currentCanvas,x,y,currentCanvas.width-x,currentCanvas.height-y,0,0,currentCanvas.width-x,currentCanvas.height-y);
                this.gifCanvasContext.drawImage(nextCanvas,0,0,nextX,nextY,currentCanvas.width-nextX,currentCanvas.height-nextY,nextX,nextY);
                this.sectionArray.push(this.gifCanvas.toDataURL('image/jpeg'));
            }
        }
    }
    stepCondition(start,end,stepLength,step,direction){
        let result = {
            x:0,
            y:0
        }
        switch(direction){
            case DIRECTION.TOP:
                result.y = start + step*stepLength;
                if(result.y>end){
                    result.y=end;
                }
                break;
            default:
                break;
        }
        return result;
    }
    getFrameStartAndEnd(direction){
        let result = {
            start:0,
            end:0
        }
        switch (direction) {
            case DIRECTION.TOP:
                result.end = this.animationCanvas.height - this.gifCanvas.height;
                break;
            //todo:补全剩下的,现在只支持了top
            default:
                break;
        }
        return result;
    }
    loadImg(src){
        return new Promise((resolve)=>{
            let img = new Image();
            img.className = 'debug';
            img.onload = function(){
                resolve(img);
            }
            img.src = src;
        })
    }
    exportGif(config){
        // todo:先什么都不传
        return new Promise(async(resolve,reject)=>{
            let gif = new Gif({
                worker:500,
                quality:10,
                workerScript:'gif.worker.js',
                debug:false,
                width:this.width,
                height:this.height
            });
            for(let sectionIndex=0,length=this.sectionArray.length;sectionIndex<length;sectionIndex++){
               let img = await this.loadImg(this.sectionArray[sectionIndex]);
            //    document.body.appendChild(img);
            //    todo:还差一个时间没有写
                gif.addFrame(img,{
                    delay:sectionIndex==0?0:1
                });
            }
            
            gif.on('finished',function(blob){
                resolve(webkitURL.createObjectURL(blob));
            })
            gif.render();
        })
    }
}
export default GifMaker;