import GifMaker from './imgTogif';
const halfOfPI = (Math.PI)/2;
function main(){
    let maker = new GifMaker({});
    let img = new Image();
    img.src = './pm.jpg';
    img.onload = function(){
        let frame = maker.createFrame();
        frame.drawImage({
            src:img
        });
        maker.addFrame(frame);
        maker.addFrame(frame);
        maker.genFrame({
            funX:(percent)=>{return 0;},
            funY:(percent)=>{
                return Math.sin(percent*halfOfPI);
            }
        });
        // maker.addPic({
        //     src:img,
        //     width:400,
        //     height:400,
        //     x:0,
        //     y:0
        // });
        // maker.addPic({
        //     src:img,
        //     width:400,
        //     height:400,
        //     x:0,
        //     y:400
        // })
        let dom = document.getElementById('gif');
        maker.exportGif().then(src=>{
            let target = document.querySelector('#gif');
            target.src = src;
        });
    }
    
}
window.onload = main;
export default main;