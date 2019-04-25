import GifMaker from './imgTogif';
function main() {
	let maker = new GifMaker({
		img: ['./1.png','./2.png','./3.png','./4.png'],
		// width:621,
		// height:292
		width:400,
		height:163
	});
	let dom = document.getElementById('gif');
	maker.exportGif().then(src => {
		dom.src = src;
	});
}
window.onload = main;
export default main;
