let promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve();
    },3000);
})
function foo(){
    promise.then(()=>{
        console.log(123);
    });
}
for(let i =0;i<3;i++){
    foo();
}