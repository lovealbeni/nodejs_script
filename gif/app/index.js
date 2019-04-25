import GifMaker from './imgTogif';
function main() {
	let maker = new GifMaker({
		img: ['./1.png','./2.png','./3.png','./4.png']
	});
	let dom = document.getElementById('gif');
	maker.exportGif().then(src => {
		dom.src = src;
	});
}
window.onload = main;
export default main;
