import GifMaker from './imgTogif';
function main(){
    let maker = new GifMaker({});
    let img = new Image();
    img.src = './pm.jpg';
    img.onload = function(){
        maker.addPic({
            src:img,
            width:400,
            height:400,
            x:0,
            y:0
        });
        maker.addPic({
            src:img,
            width:400,
            height:400,
            x:0,
            y:400
        })
        let dom = document.getElementById('gif');
        maker.genFrame();
        maker.exportGif().then(src=>{
            let target = document.querySelector('#gif');
            target.src = src;
        });
    }
    
}
window.onload = main;
export default main;