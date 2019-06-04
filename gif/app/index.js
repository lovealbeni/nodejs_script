import GifMaker from './imgTogif';
import TextColum from './textColum';
import ThreeGif from './threeGif';
function main(){
	let gif = new ThreeGif();
	gif.export();
	// let maker = new TextColum({
	// 	textArray:['123','456'],	
	// 	width:1242,
	// 	height:101,
	// 	backgroundImg: './textBkg.jpg',
	// 	gifConfig:{
	// 		quality:1,
	// 		debug:true
	// 	}
	// })
	// let dom = document.getElementById('gif');
	// maker.exportGif().then(src=>{
	// 	dom.src = src;
	// });
	// let maker2 = new GifMaker({
	// 	img: ['./1.png','./2.png','./3.png','./4.png','./2.png','./3.png'],
	// 	width:621,
	// 	height:292,
	// 	backgroundImg:'./background.jpg',
	// 	gifConfig:{
	// 		debug:true
	// 	}
	// });
	// let dom2 = document.getElementById('gif2');
	// maker2.exportGif().then(src => {
	// 	dom2.src = src;
	// });

	// new GifMaker({
	// 	img: ['./1.png','./2.png','./3.png','./4.png','./2.png','./3.png'],
	// 	width:621,
	// 	height:292,
	// 	backgroundImg:'./background.jpg',
	// 	funY:percent=>{
	// 		return percent;
	// 	}
	// }).exportGif().then(src=>{
	// 	let dom = document.createElement('img');
	// 	dom.src = src;
	// 	dom.className = 'linear';
	// 	document.body.appendChild( dom );
	// });
}
window.onload = main;
export default main;
