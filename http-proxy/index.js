var httpProxy = require('http-proxy');
var http = require('http');
var proxy = httpProxy.createProxyServer({});


// 访问地址
var server = http.createServer(function(req,res){
    console.log(req.headers.host);
    console.log('*'.repeat(10));
    proxy.web(req,res,{
        target: req.headers.host
    });
});
server.listen(5050);

http.request()