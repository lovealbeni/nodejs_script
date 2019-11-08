function clone(src, map = {}) {
    let target = Array.isArray(src) ? [] : {};
    for (let key in src) {
        let source = src[key];
        if (typeof source === 'object') {
            if(!map[source]){
                target[key] = clone(source, map);
                map[source] = target[key];
            } else {
                target[key] = map[source];
                return target;
            }
        } else {
            target[key] = source;
        }
    }
    return target;
}

var data = {
    c: [1, 2, 3],
    u: undefined,
    o:{},
    m:{}
}
data.o.m = data.m;
data.m.o = data.o;
var assign = {};

assign = clone(data);


assign.c.push(4);
