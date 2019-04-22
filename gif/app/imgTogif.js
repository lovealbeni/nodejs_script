import Gif from './gif';
import GifWorker from './gif.worker';
const DIRECTION = {
    TOP:'top',
    RIGHT:'right',
    BOTTOM:'bottom',
    LEFT:'left'
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
        this.staticCanvs = document.createElement('canvas');
        this.staticCanvsContext = this.staticCanvs.getContext('2d');
        this.animationCanvas = document.createElement('canvas');
        this.animationCanvas.width = this.width;
        this.animationCanvas.height = this.height;
        this.animationCanvasContext = this.animationCanvas.getContext('2d');
    }
    addPic(picConfig){
        // 图片宽,高,src和x,y坐标
        try {
            this._addPicHandler(picConfig)
        } catch (error) {
            throw new Error(error);
        }
    }
    drawGif(gifConfig){
        // 图片帧数,持续时间,方向
        try {
            return this._drawGifHandler(gifConfig);
        } catch (error) {
            throw new Error(error)
        }
    }
    _drawGifHandler(gifConfig){
        return new Promise((resolve,reject)=>{
            let gif = new Gif({
                worker:2,
                quality:10,
                workerScript:'gif.worker.js',
                transparent: '0xffffff',
                debug:true,
                width:this.width,
                height:this.height
            })
            let delay = gifConfig.frame/gifConfig.duringTime;
            let stepLength = 0;
            if(gifConfig.direction == DIRECTION.LEFT || gifConfig.direction == DIRECTION.RIGHT){
                stepLength = this.width/gifConfig.frame;
            }else if(gifConfig.direction == DIRECTION.TOP || gifConfig.direction == DIRECTION.BOTTOM){
                stepLength = this.height/gifConfig.frame;
            }
            let drawFrom,drawTo;
            switch (gifConfig.direction) {
                case DIRECTION.LEFT:
                    // 向左移动
                    drawFrom = Math.max(this.width,this.animationCanvas.width-this.width);
                    drawTo = 0;
                    break;
                case DIRECTION.RIGHT:
                    drawFrom = 0;
                    drawTo = Math.max(this.width,this.animationCanvas.width-this.width);
                    break;
                default:
                    break;
            }
            let isFirst = true;
            while(drawFrom!=drawTo){
                this.gifCanvasContext.clearRect(0,0,this.width,this.height);
                this.gifCanvasContext.drawImage(this.animationCanvas,drawFrom,0,this.width,this.height);
                gif.addFrame(this.gifCanvasContext,{
                    copy:true,
                    delay:isFirst?0:delay
                });
                isFirst = false;
                drawFrom = this.stepCondition(drawFrom,gifConfig.direction,stepLength,drawTo);
            }
            gif.on('finished',function(blob){
                console.log(webkitURL.createObjectURL(blob));
                resolve(webkitURL.createObjectURL(blob));
            })
            gif.render();
        });
    }
    stepCondition(step,direction,stepLength,target){
        switch (direction) {
            case DIRECTION.LEFT:
                step = step - stepLength;
                if(step<target){
                    step = target;
                }
                break;
            case DIRECTION.RIGHT:
                step = step + stepLength;
                if(step>target){
                    step = target;
                }
            default:
                break;
        }
        return step;
    }
    _addPicHandler(picConfig){
        if(picConfig.x + picConfig.width > this.width){
            this.animationCanvas.width = picConfig.x + picConfig.width;
        }
        if(picConfig.y + picConfig.height > this.height){
            this.animationCanvas.height = picConfig.y + picConfig.height;
        }
        this.animationCanvasContext.drawImage(picConfig.src,picConfig.x,picConfig.y,picConfig.width,picConfig.height);
    }
}
export default GifMaker;