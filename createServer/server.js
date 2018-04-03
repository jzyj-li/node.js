/*
*
* @desc 详解node.js http 模块
* */
const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((request, res) => {
    let pathname = url.parse(request.url).pathname;
    console.log(pathname);
    switch(pathname){
        case '/index':resIndex(res);
        break;
        case '/image': resImage(res);
        default: resDefault(res);
        break;
    }
}).listen(3000);

function resIndex(res) {
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    var page = fs.readFileSync(readPath);
    res.writeHead('200', {'Context-Type': 'text/html'});
    res.end(page);
}

function resImage(res) {
    var readPath = __dirname + '/' + url.parse('ss.png').pathname;
    var page = fs.readFileSync(readPath);
    res.writeHead('200', {'Context-Type': 'image/png'});
    res.end(page);
}

function resDefault(res) {
    res.writeHead('200', {'Context-Type': 'text/html'});
    res.end('33');
}