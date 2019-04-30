import GifMaker from './imgTogif';
import TextColum from './textColum';
function main(){
	let maker = new TextColum({
		textArray:['123','456'],
		width:1242,
		height:101,
		backgroundImg: './textBkg.jpg',
		gifConfig:{
			quality:1,
			debug:false
		}
	})
	let dom = document.getElementById('gif');
	maker.exportGif().then(src=>{
		dom.src = src;
	});
	let maker2 = new GifMaker({
		img: ['./1.png','./2.png','./3.png','./4.png','./2.png','./3.png'],
		width:621,
		height:292,
		backgroundImg:'./background.jpg'
	});
	let dom2 = document.getElementById('gif2');
	maker2.exportGif().then(src => {
		dom2.src = src;
	});
}
window.onload = main;
export default main;
