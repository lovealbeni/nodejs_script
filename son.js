function father(){
    this.name = 'father';
}

function son(){
    this.age = 12;
}

son.prototype = new father();
console.log(son.prototype.constructor);
son.prototype.constructor = son;

var sonEntity = new son();
console.log(sonEntity.constructor)
console.log(sonEntity instanceof father);