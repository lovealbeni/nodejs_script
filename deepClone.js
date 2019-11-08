function clone(src, map = {}) {
    let target = Array.isArray(src) ? [] : {};
    for (let key in src) {
        let source = src[key];
        if (typeof source === 'object') {
            target[key] = clone(source, map);
        } else {
            target[key] = source;
        }
    }
    return target;
}

var data = {
    c: [1, 2, 3],
    u: undefined
}
data.d = data;

var assign = {};

assign = clone(data);

console.log('assign', assign);

assign.c.push(4);

console.dir(data);
console.dir(assign.d.c);