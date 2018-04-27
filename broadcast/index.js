/*
* 在线聊天系统
* */

const http = require('http');
const Until = require('./app/core/router');
const httpParam = require('./app/core/httpParam');
const conf = require('./conf/api')

global.BASE_DIR = __dirname;
global.VIEW = global.BASE_DIR + '/view/';
global.DATABASE = global.BASE_DIR + '/database/';
global.PORT = conf.port;

http.createServer((req, res) => { //     第一个参数为请求第二个参数  为回应
    "use strict";
    Until.init(req.url, req).then(reslove => {
        if (!reslove) {
            return;
        }
        reslove.header && res.setHeader('Set-Cookie', ['token='+ reslove.header, '']);
        res.writeHead(200, {'Content-Type': reslove.type +'; charset=utf-8'}); // charset=utf-8 指定编码方式

        res.end(reslove.response)
    }).catch(err => {
        throw err
    })

}).listen(global.PORT); // 默认2000

