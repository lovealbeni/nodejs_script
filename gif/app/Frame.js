class Frame{
    constructor(config){
        this.width = config.width;
        this.height = config.height;
        this.frameCanvas = document.createElement('canvas');
        this.frameCanvas.width = this.width;
        this.frameCanvas.height = this.height;
        this.frameCanvasContext = this.frameCanvas.getContext('2d');
        this.imgData = [];
    }
    drawImage({src,width=this.width,height=this.height}){
        this.frameCanvasContext.drawImage(src,0,0,width,height,x,y,width,height);
    }
}
export default Frame;