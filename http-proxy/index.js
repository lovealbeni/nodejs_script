var httpProxy = require('http-proxy');
var http = require('http');
var proxy = httpProxy.createProxyServer({});


// 访问地址
var server = http.createServer(function(req,res){
    proxy.web(req,res,{
        target: 'http://localhost:7300'
    });
});
server.listen(5050);