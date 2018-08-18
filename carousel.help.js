this.wrapperPos = -($('.category').width())/2;
this.maxOffset = $('.scroll-wrapper').width() - $('.category').width();
let pos = $('.selectCategory.selected').position().left + $('.selectCategory.selected').width()/2;
let offset = ((this.wrapperPos+pos));
this.moreCarousel = new Swiper('.swiper-container',{});
if(this.maxOffset<=0){
	return;
}
if(offset<0){
	return;
}else if(offset>this.maxOffset){
	offset = this.maxOffset;
}
this.carousel._scroll((-(offset)),true);

<div class="category">
			<div class="scroll-wrapper">
				<div class="selectCategory" :class="item.cat_id==selectId?'selected':''" v-for="item in allTags" @click="selectCategory(item.cat_id)">
					{{item.cat_name}}
				</div>
			</div>
		</div>
//moveTo example
function MoveTo(startPos,endPos,isFirst=true){
	if(isFirst){
		distance = endPos - startPos;
		a = distance/50;
		v = distance/100;
	}
	$(window).scrollTop(startPos);
	if(startPos == endPos){
		return;
	}
	if(distance>0){
		startPos = Math.min(startPos + v,endPos);
	}else if(distance<0){
		startPos = Math.max(startPos + v,endPos);
	}
	v = v + a;
	setTimeout(()=>{
		MoveTo(startPos,endPos,false);
	},1000/60);
}
