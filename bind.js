Function.prototype.bind2 = function (context) {
    var that = this;
    var rFunction = function () {
        that.apply(this instanceof that?this:context, arguments);
    }
    rFunction.prototype = this.prototype;
    return rFunction;
}

function log() {
    this.abc = 'name';
    console.log(this.name);
}

var obj = {
    name: 'obj bind name'
}

var logBind = log.bind2(obj);
logBind();

var entity = new logBind();

console.log(entity.constructor);