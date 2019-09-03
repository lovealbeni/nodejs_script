var worker = new Worker('./worder.js');
worker.postMessage({
    type:'start',
    value:Infinity
})
worker.onmessage = function(event){
    console.log(event);
}

for(let i =0;i<20;i++){
    console.log('lalala');
}