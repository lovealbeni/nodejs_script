this.wrapperPos = -($('.category').width())/2;
this.maxOffset = $('.scroll-wrapper').width() - $('.category').width();
let pos = $('.selectCategory.selected').position().left + $('.selectCategory.selected').width()/2;
let offset = ((this.wrapperPos+pos));
this.moreCarousel = new Swiper('.swiper-container',{});
if(offset<0){
	return;
}else if(offset>this.maxOffset){
	offset = this.maxOffset;
}
this.carousel._scroll((-(offset)),true);