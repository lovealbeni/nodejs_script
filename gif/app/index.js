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
            funX:(percent)=>{
                // return Math.sin(percent*halfOfPI);
                return 0;
            },
            funY:(percent)=>{
                return Math.sin(percent*halfOfPI);
            }
        });
        let dom = document.getElementById('gif');
        maker.exportGif().then(src=>{
            dom.src = src;
        });
    }
    
}
window.onload = main;
export default main;