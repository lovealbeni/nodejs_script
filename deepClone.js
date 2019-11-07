function clone(src,map = {}){
    let target = Array.isArray(src) ? [] : {};
    for(let key in src){
        if(typeof src[key] === 'object'){
            if(map[src[key]]){
                return map[src[key]];
            }
            target[key] = clone(src[key],map);
            map[src[key]] = target;
        }else{
            target[key] = src[key];
        }
    }
    return target;
}

var data = {
    c:[1,2,3],
    u:undefined
}
data.d = data;

var assign = {};

assign = clone(data);

console.log('assign',assign);

assign.c.push(4);

console.dir(data);
console.dir(assign.d.c);