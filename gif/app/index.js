import GifMaker from './imgTogif';
function main(){
    let maker = new GifMaker({});
    let img = document.getElementById('img');
    maker.addPic({
        src:img,
        width:200,
        height:200,
        x:0,
        y:0
    });
    let dom = document.getElementById('gif');
    maker.drawGif({
        frame:10,
        duringTime:5,
        direction:'right'
    }).then(res=>{
        dom.src = res;
    });
    // let canvas = document.createElement('canvas');
    // let canvasContent = canvas.getContext('2d');
    // let cacheCanvas = document.createElement('canvas');
    // let cacheCanvasContent = cacheCanvas.getContext('2d');
    // let frame = 60;//hz
    // let duringTime = 2;//s
    // let perPicSize = {
    //     width:200,
    //     height:200
    // }//px
    // canvas.height = perPicSize.height*2;
    // canvas.width = perPicSize.width*2;
    // var gif = new GIF({
    //     workers:2,
    //     quality:10,
    //     workerScript:'gif.worker.js',
    //     transparent:'0xffffff',
    //     debug:true,
    //     width:canvas.width,
    //     height:canvas.height
    // });
    // let animationType = ANIMATIONTYPE.TYPE_COL;
    // let picNumber = 2;
    // let sumPicSize;

    // cacheCanvas.width = perPicSize.width;
    // cacheCanvas.height = perPicSize.height;
    // cacheCanvasContent.drawImage(img,0,0,perPicSize.width,perPicSize.height);
    
    // canvasContent.drawImage(cacheCanvas,0,0,perPicSize.width,perPicSize.height);
    // canvasContent.drawImage(cacheCanvas,0,perPicSize.height,perPicSize.width,perPicSize.height);
    // let data = canvasContent.getImageData(0,0,canvas.width,canvas.height);
    // gif.addFrame(canvasContent,{
    //     copy:true
    // });
    // for(let step=0;step<perPicSize.width;step++){
    //     canvasContent.clearRect(0,0,canvas.width,canvas.height);
    //     canvasContent.drawImage(cacheCanvas,step,0,perPicSize.width,perPicSize.height);
    //     //谁小画谁
    //     canvasContent.drawImage(cacheCanvas,step,perPicSize.height,perPicSize.width,perPicSize.height);
    //     gif.addFrame(canvasContent,{
    //         copy:true,
    //         delay:20
    //     });
    // }
    // var time = 0;
    // gif.on('finished',function(blob){
    //     dom.src = webkitURL.createObjectURL(blob);
    //     console.log(Date.now()-time);
    // });
    // time = Date.now();
    // gif.render();
}
function frameToTime(frame){
    return ;
}
function attach(canvas){
    let body = document.querySelector('body');
    body.appendChild(canvas);
}
window.onload = main;
export default main;