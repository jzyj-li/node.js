/*
* 在线聊天系统
* */

const http = require('http');
const Until = require('./app/core/router');

global.BASE_DIR = __dirname;
global.VIEW = global.BASE_DIR + '/view/';

http.createServer((req, res) => { // 第一个参数为请求第二个参数  为回应
    "use strict";
    Until.init(req.url, req).then(reslove => {
        if (!reslove) {
            return
        }
        res.writeHead(200, {'Content-Type': reslove.type +'; charset=utf-8'}); // charset=utf-8 指定编码方式
        res.end(reslove.response)
    })
}).listen(3000)


// // jade
// var fn = jade.compile('h1 22'); //<h1>22</h1>
// //console.log(fn())
//
// var fn = jade.compileFile('./view/login.jade', {pretty: true})
// //console.log(fn())
//
// var fn = jade.compileClient('h2 dd'); // reqturn javascript
// console.log(fn)
//
// var jsFunctionString = jade.compileFileClient('./view/login.jade', {name: 'fancyTemplateFun'})
// console.log(jsFunctionString.toString())
// fs.writeFileSync('template.js', jsFunctionString)
//
// // jade render
// console.log(jade.render('h2 ss'))
// console.log(jade.renderFile('./view/login.jade'))
