/*
* 在线聊天系统
* */

const http = require('http');
const Until = require('./app/core/router');
const httpParam = require('./app/core/httpParam')

global.BASE_DIR = __dirname;
global.VIEW = global.BASE_DIR + '/view/';

http.createServer((req, res) => { // 第一个参数为请求第二个参数  为回应
    "use strict";
    if (req.url == '/api/login/111') {
        httpParam.getPostParam(req)
    } else {
        Until.init(req.url, req).then(reslove => {
            if (!reslove) {
                return;
            }

            res.writeHead(200, {'Content-Type': reslove.type +'; charset=utf-8'}); // charset=utf-8 指定编码方式
            res.end(reslove.response)
        })
    }


}).listen(2000)

