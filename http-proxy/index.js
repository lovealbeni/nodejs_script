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

var otherServer = http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/plain'
    });
    res.write('suc');
    res.end();
})
otherServer.listen(5060);