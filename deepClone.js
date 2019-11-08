function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};


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

console.log(assign);

assign.c.push(4);
