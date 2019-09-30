function prepareTextureImg(url:String){
    // 准备纹理贴图的
    return new Promise<HTMLImageElement>((resove,reject)=>{
        var img = new Image();
        img.onload = function(){
            resove(img);
        };
        img.src = url.toString();
    });
}

function prepareTexturePositions(){
    var positions = [
        30,30,0,0,
        30,300,0,1,
        300,300,1,1,
        30,30,0,0,
        300,300,1,1,
        300,30,1,0
    ];
    return positions;
}

export default { prepareTextureImg,prepareTexturePositions }