function clone(src){
    let target = Array.isArray(src) ? [] : {};
    for(let key in src){
        if(typeof src[key] === 'object'){
            target[key] = clone(src[key]);
        }else{
            target[key] = src[key];
        }
    }
    return target;
}

var data = {
    a:1,
    b:{
        ba:1,
        bc:2
    },
    c:[1,2,3]
}

var assign = {};

assign = clone(data);

console.log('assign',assign);

assign.c.push(4);
assign.b.bb = 3;

console.log('after change data',data.b);
console.log('after change assign',assign.b);