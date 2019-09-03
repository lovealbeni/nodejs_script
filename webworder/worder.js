this.onmessage = function(event){
    main(event);
};

function main(event){
    console.log('worker event',event);
    for(var i=0;i<event.data.value;i++){
        console.log(i);
    }
    postMessage({
        type:'suc',
        message:'ok'
    })
}