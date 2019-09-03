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
    drawImage({src,x=0,y=0,width=this.width,height=this.height}){
        this.frameCanvasContext.drawImage(src,x,y,width,height);
    }
    getCanvas(){
        return this.frameCanvas;
    }
    toDataURL(type){
        return this.frameCanvas.toDataURL(type);
    }
}
// export default Frame;
module.exports = Frame;