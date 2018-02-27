var lastFrameTime = 0;
// 模拟 requestAnimationFrame
var doAnimationFrame = function (callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
    var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
    lastFrameTime = currTime + timeToCall;
    return id;
};
// 模拟 cancelAnimationFrame
var abortAnimationFrame = function (id) {
    clearTimeout(id)
}
