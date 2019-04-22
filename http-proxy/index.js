var httpProxy = require('http-proxy');
var http = require('http');
httpProxy.createProxyServer({
    target:'http://localhost:9000'
}).listen(8000);
http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/plain'
    });
    res.write('request !'+'\n'+JSON.stringify(req.headers,true,2));
    res.end();
}).listen(9000);