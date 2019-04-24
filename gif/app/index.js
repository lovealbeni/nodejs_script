import GifMaker from './imgTogif';
function main() {
	let maker = new GifMaker({
		img: ['./pm.jpg']
	});
	let dom = document.getElementById('gif');
	maker.exportGif().then(src => {
		dom.src = src;
	});
}
window.onload = main;
export default main;
